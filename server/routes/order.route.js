import { Router } from "express";
import auth from "../middleware/auth.js";
import { CashOnDeliveryOrderController, GetOrderDetailsController, StripePaymentOrderController, StripeWebhookController } from "../controllers/order.controller.js";

const orderRouter = Router();

orderRouter.post("/cash-on-delivery", auth, CashOnDeliveryOrderController);

orderRouter.post("/checkout", auth, StripePaymentOrderController);

orderRouter.post("/webhook", StripeWebhookController)

orderRouter.get("/order-list", auth, GetOrderDetailsController)


export default orderRouter