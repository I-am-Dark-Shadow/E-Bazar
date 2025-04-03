import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
    orderId: {
        type: String,
        required: [true, "Please add an order id"],
        unique: true,
        default: "",
    },
    productId:{
        type: mongoose.Schema.ObjectId,
        ref: "product",
    },
    product_details: {
        name: String,
        image: Array,
    },
    paymentId: {
        type: String,
        default: "",
    },
    payment_status: {
        type: String,
        default: "",
    },
    delivary_address: {
        type: mongoose.Schema.ObjectId,
        ref: "address",
    },
    // delivary_status: {

    // },
    subTotalAmt: {
        type: Number,
        default: 0,
    },
    totalAmt: {
        type: Number,
        default: 0,
    },
    invoice_receipt: {
        type: String,
        default: "",
    },

}, { timestamps: true // add created_at and updated_at fields

});

const OrderModel = mongoose.model("order", orderSchema);
export default OrderModel