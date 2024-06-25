const express = require("express");
const router = express.Router();
const orderItemController = require('../controllers/orderItemController');

// get all order items
router.get("/", orderItemController.getAllOrderItems);

// get order item by ID
router.get("/:order_item_id", orderItemController.getOrderItemById);

// add a new order item
router.post("/", orderItemController.createOrderItem);

// update an order item
router.put("/:order_item_id", orderItemController.updateOrderItem);

// delete an order item
router.delete("/:order_item_id", orderItemController.deleteOrderItem);

module.exports = router;
