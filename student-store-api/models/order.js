const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// get all orders
const getAllOrders = async () => {
  return prisma.order.findMany({
    include: {
        orderItems: true
    }
  });
};

// get order by ID
const getOrderById = async (order_id) => {
  return prisma.order.findUnique({ where: { order_id: parseInt(order_id) }, include: {
    orderItems: true
  } });
};

// create new order
const createOrder = async (orderData) => {
  return prisma.order.create({ data: orderData });
};

// update an order
const updateOrder = async (order_id, orderData) => {
  return prisma.order.update({
    where: { order_id: parseInt(order_id) },
    data: orderData,
  });
};

// delete an order
const deleteOrder = async (order_id) => {
  return prisma.order.delete({ where: { order_id: parseInt(order_id) } });
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
};
