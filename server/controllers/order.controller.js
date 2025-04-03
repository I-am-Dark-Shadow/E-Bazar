import CartProductModel from "../models/cartProduct.model.js";
import OrderModel from "../models/order.model.js";

// for creating orderid
import mongoose from "mongoose";
import UserModel from "../models/user.model.js";
import stripeInstance from "../config/stripe.js";

export async function CashOnDeliveryOrderController(req, res) {
    try {
        const userId = req.userId; // get the user id from middleware auth.js for only logged in user can get the details

        const { list_items, totalAmt, addressId, subTotalAmt } = req.body;

        const payload = list_items.map((el) => {
            const priceAfterDiscount = Math.floor(el.productId?.price - (el.productId?.price * (el.productId?.discount / 100)));
            console.log("Payload Item:", {
                name: el.productId?.name,
                image: el.productId?.image,
                // price: priceAfterDiscount,
            });
            return ({
                userId: userId,
                orderId: `ORD- ${new mongoose.Types.ObjectId()}`, // orderId automatically generated
                productId: el.productId?._id,
                product_details: {
                    name: el.productId?.name,
                    image: el.productId?.image,
                    price: priceAfterDiscount,
                },
                paymentId: "", // for cash on delivery paymentId is empty
                payment_status: "CASH ON DELIVERY",
                delivary_address: addressId,
                subTotalAmt: subTotalAmt,
                totalAmt: totalAmt,
            })
        });
        //console.log("price", payload);


        // insert in order collection save in mongodb database
        const generateOrder = await OrderModel.insertMany(payload);

        // remove in header section all the cart items and amounts and go to oreder section
        const removeCartItems = await CartProductModel.deleteMany({ userId: userId });
        const updateInUser = await UserModel.updateOne({ _id: userId }, { shopping_cart: [] });


        return res.status(201).json({
            message: "Order placed successfully",
            success: true,
            error: false,
            data: generateOrder
        });


    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export const PriceWithDiscount = (price, discount = 1) => {
    const discountAmount = Math.ceil((Number(price) * Number(discount)) / 100)
    const actualPrice = Number(price) - Number(discountAmount)
    return actualPrice
}

export async function StripePaymentOrderController(req, res) {
    try {
        const userId = req.userId; // get the user id from middleware auth.js for only logged in user can get the details
        const { list_items, totalAmt, addressId, subTotalAmt } = req.body;

        const user = await UserModel.findById(userId);

        // Calculate delivery charge if needed
        let finalTotalAmt = totalAmt;
        if (totalAmt < 499) {
            finalTotalAmt += 199; // Add delivery charge
        }

        const line_items = list_items.map((item) => {
            return {
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: item.productId?.name,
                        images: item.productId?.image,
                        metadata: {
                            productId: item.productId?._id,
                        }
                    },
                    // because stripe takes price in cents because it is american currency that convert to indian currency thats why we multiply by 100
                    unit_amount: PriceWithDiscount(item.productId?.price, item.productId?.discount) * 100,
                },
                adjustable_quantity: {
                    enabled: true,
                    minimum: 1,
                },
                quantity: item.quantity,
            }
        });

        if (totalAmt < 499) {
            line_items.push({
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: "Delivery Charge",
                    },
                    unit_amount: 199 * 100, // Convert to paisa
                },
                quantity: 1,
            });
        }

        const params = {
            submit_type: "pay",
            payment_method_types: ["card"],
            customer_email: user.email,
            // metadata mean cusomer add more details
            metadata: {
                userId: userId,
                addressId: addressId,
            },
            line_items: line_items,
            mode: "payment",
            success_url: `${process.env.FRONTEND_URL}/success`,
            cancel_url: `${process.env.FRONTEND_URL}/payment-cancel`,
        }
        const session = await stripeInstance.checkout.sessions.create(params);

        return res.status(200).json(session);

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

const getOrderProductItems = async ({ lineItems, userId, addressId, paymentId, payment_status, subTotalAmt, totalAmt }) => {
    const productList = [];

    if (lineItems?.data?.length > 0) {
        for (const item of lineItems.data) {
            const product = await stripeInstance.products.retrieve(item.price.product);

            const payload = {
                userId: userId,
                orderId: `ORD- ${new mongoose.Types.ObjectId()}`, // orderId automatically generated
                productId: product.metadata.productId,
                product_details: {
                    name: product.name,
                    image: product.images[0]
                },
                paymentId: paymentId, // for cash on delivery paymentId is empty
                payment_status: payment_status,
                delivary_address: addressId,
                subTotalAmt: Number(item.amount_subtotal) / 100,
                totalAmt: Number(item.amount_total) / 100,
            }

            productList.push(payload)
        }
    }

    return productList
}

// create srtipe ebhook url
// http://localhost:8080/api/order/webhook

export async function StripeWebhookController(req, res) {
    const event = req.body;
    const endPointSecret = process.env.STRIPE_ENDPOINT_WEBHOOK_SECRET_KEY

    //console.log("event",event);


    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;

            const lineItems = await stripeInstance.checkout.sessions.listLineItems(session.id);
            //console.log("line_items",line_items);

            const userId = session.metadata.userId;

            const orderProduct = await getOrderProductItems(
                {
                    lineItems: lineItems,
                    userId: userId,
                    addressId: session.metadata.addressId,
                    paymentId: session.payment_intent,
                    payment_status: session.payment_status,
                }
            );

            //console.log("orderProduct", orderProduct);


            // insert in order collection save in mongodb database
            const order = await OrderModel.insertMany(orderProduct);

            if (order) {
                // remove in header section all the cart items and amounts and go to oreder section
                const removeCartItems = await OrderModel.findByIdAndUpdate(userId, {
                    shopping_cart: []
                });
                const removeCartProductDB = await CartProductModel.deleteMany({ userId: userId });
            }


            break;
        // ... handle other event types
        default:
            console.log(`Unhandled event type ${event.type}`);
    }
    // Return a response to acknowledge receipt of the event
    res.json({ received: true });
}


export async function GetOrderDetailsController(req, res) {
    try {
        const userId = req.userId; // get the user id from middleware auth.js for only logged in user can get the details
        const orderlist = await OrderModel.find({ userId: userId }).sort({ createdAt: -1 }); // here sort({ createdAt: -1 }) is for sorting the data in descending order or latest data will be on top

        return res.json({
            message: "Order List",
            data: orderlist,
            error: false,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}
