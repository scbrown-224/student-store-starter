const orderItemModel = require('../models/orderItem');

const getAllOrderItems = async (req, res) => {
  try {
    const orderItems = await orderItemModel.getAllOrderItems();
    res.status(200).json(orderItems); // Corrected variable name from 'orders' to 'orderItems'
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getOrderItemById = async (req, res) => {
  try {
    const orderItem = await orderItemModel.getOrderItemById(req.params.order_item_id);
    if (orderItem) {
      res.status(200).json(orderItem);
    } else {
      res.status(404).json({ error: "Order item not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createOrderItem = async (req, res) => {
  const orderItemData = req.body;
  try {
    const newOrderItem = await orderItemModel.createOrderItem(orderItemData); // Corrected variable name from 'req.body' to 'orderItemData'
    res.status(201).json(newOrderItem); // Corrected variable name from 'newOrder' to 'newOrderItem'
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateOrderItem = async (req, res) => {
  try {
    const updatedOrderItem = await orderItemModel.updateOrderItem(req.params.order_item_id, req.body);
    if (updatedOrderItem) {
      res.status(200).json(updatedOrderItem);
    } else {
      res.status(404).json({ error: "Order item not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteOrderItem = async (req, res) => {
  try {
    const deletedOrderItem = await orderItemModel.deleteOrderItem(req.params.order_item_id);
    if (deletedOrderItem) {
      res.status(200).json(deletedOrderItem);
    } else {
      res.status(404).json({ error: "Order item not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllOrderItems,
  getOrderItemById,
  createOrderItem,
  updateOrderItem,
  deleteOrderItem,
};

