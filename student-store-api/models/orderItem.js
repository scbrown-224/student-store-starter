const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// get all order items
const getAllOrderItems = async () => {
  return prisma.orderItem.findMany(); // Adjusted to match your model name 'orderItem'
};

// get order item by ID
const getOrderItemById = async (order_item_id) => {
  return prisma.orderItem.findUnique({ where: { order_item_id: parseInt(order_item_id) } }); // Adjusted to match your model name 'orderItem'
};

// create new order item
const createOrderItem = async (orderItemData) => {
  return prisma.orderItem.create({ data: orderItemData }); // Adjusted to match your model name 'orderItem'
};

// update an order item
const updateOrderItem = async (order_item_id, orderItemData) => {
  return prisma.orderItem.update({
    where: { order_item_id: parseInt(order_item_id) },
    data: orderItemData,
  }); // Adjusted to match your model name 'orderItem'
};

// delete an order item
const deleteOrderItem = async (order_item_id) => {
  return prisma.orderItem.delete({ where: { order_item_id: parseInt(order_item_id) } }); // Adjusted to match your model name 'orderItem'
};


module.exports = {
  getAllOrderItems,
  getOrderItemById,
  createOrderItem,
  updateOrderItem,
  deleteOrderItem,
};
