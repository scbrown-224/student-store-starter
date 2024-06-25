

const express = require("express");
const router = express.Router();
const orderController = require('../controllers/orderController');

// get all the orders
router.get("/", orderController.getAllOrders);
// get order by ID
router.get("/:order_id", orderController.getOrderById);
// add a new order
router.post("/", orderController.createOrder);
// update an order
router.put("/:order_id", orderController.updateOrder);
// delete an order
router.delete("/:order_id", orderController.deleteOrder);

module.exports = router;
