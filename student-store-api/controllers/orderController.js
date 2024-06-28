const orderModel = require('../models/order');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel.getAllOrders();
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const getOrderById = async (req, res) => {
  try {
    const order = await orderModel.getOrderById(req.params.order_id);
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ error: "Order not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createOrder = async (req, res) => {
  const orderData = req.body;
  try {
    const newOrder = await orderModel.createOrder(req.body);
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateOrder = async (req, res) => {
  try {
    const updatedOrder = await orderModel.updateOrder(req.params.order_id, req.body);
    if (updatedOrder) {
      res.status(200).json(updatedOrder);
    } else {
      res.status(404).json({ error: "Order not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await orderModel.deleteOrder(req.params.order_id);
    if (deletedOrder) {
      res.status(200).json(deletedOrder);
    } else {
      res.status(404).json({ error: "Order not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const addToExistingOrder = async (req, res) => {
  try {
    const orderItem = await orderModel.addToExistingOrder(req.params.order_id, req.body);
    res.json(orderItem);
  } catch (error) {
    console.error('error adding item to order', error);
    res.status(500).json({ error: 'internal server error' });
  }
};

const deleteItem = async (req, res) => {
  try {
    const orderItem = await orderModel.deleteItem(req.params.order_id, req.params.order_item_id);
    res.json(orderItem);
  } catch (error) {
    console.error('error deleting item from order', error);
    res.status(500).json({ error: 'internal server error' });
  }
};

const getTotal = async(req, res) => {
  try {
    const totalPrice = await orderModel.getTotal(req.params.order_id);
    res.status(200).json({total_price: totalPrice});
  }
  catch (error) {
    res.status(400).json({error: error.message});
  }
}

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  addToExistingOrder,
  deleteItem, 
  getTotal
};
