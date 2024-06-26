// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();

// // get all orders
// const getAllOrders = async () => {
//   return prisma.order.findMany({
//     include: {
//         orderItems: true
//     }
//   });
// };

// // get order by ID
// const getOrderById = async (order_id) => {
//   return prisma.order.findUnique({ where: { order_id: parseInt(order_id) }, include: {
//     orderItems: true
//   } });
// };

// // create new order
// const createOrder = async (orderData) => {
//   return prisma.order.create({ data: orderData });
// };

// // update an order
// const updateOrder = async (order_id, orderData) => {
//   return prisma.order.update({
//     where: { order_id: parseInt(order_id) },
//     data: orderData,
//   });
// };

// // delete an order
// const deleteOrder = async (order_id) => {
//   return prisma.order.delete({ where: { order_id: parseInt(order_id) } });
// };


// // add an item to an existing order
// const addToExistingOrder = async (order_id, orderData) => {
//   // return prisma.orderItem.create({
//   //   data: {
//   //     order_id: parseInt(order_id),
//   //     ...orderItemData, // includes all properties from 
//   //   },
//   // });

//   const product = await prisma.product.findUnique({where: {id: orderData.product_id}});
//   const order = await prisma.order.findUnique({where: {order_id: parseInt(order_id)}});

//   await prisma.order.update ({
//     where: {order_id : order_id}, 
//     data: {
//       total_price: parseDecimal(order.total_price) + parseDecimal(product.price) * parseInt(orderData.quantity)
//     }
//   })

//   return prisma.orderItem.create({
//     order_id: parseInt(order_id), 
//     product_id: parseInt(orderData.product_id), 
//     quantity: parseInt(orderData.quantity), 
//     price: parseDecimal(product.price) * parseInt(orderData.quantity)
//   })

// };

// const deleteItem = async(order_id, order_item_id) => {
//   const orderItem = await prisma.orderItem.findUnique({where: {order_item_id: parseInt(order_item_id)}});
//   const order = await prisma.order.findUnique({where: {order_id: parseInt(order_id)}});

//   await prisma.order.update({
//     where: {order_id: parseInt(order_id)}, 
//     data: {
//       total_price: parseDecimal(order.total_price) - parseDecimal(orderItem.price)
//     }
//   })

//   return prisma.order_item.delete({
//     where: {order_item_id: parseInt(order_item_id)}
//   });

// }



// module.exports = {
//   getAllOrders,
//   getOrderById,
//   createOrder,
//   updateOrder,
//   deleteOrder,
//   addToExistingOrder,
//   deleteItem
// };

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const parseDecimal = (value) => {
  return parseFloat(value);
};

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
  return prisma.order.findUnique({ 
    where: { order_id: parseInt(order_id) }, 
    include: {
      orderItems: true
    } 
  });
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

// add an item to an existing order
const addToExistingOrder = async (order_id, orderData) => {
  const product = await prisma.product.findUnique({ where: { id: orderData.product_id } });
  const order = await prisma.order.findUnique({ where: { order_id: parseInt(order_id) } });

  await prisma.order.update({
    where: { order_id: parseInt(order_id) },
    data: {
      total_price: parseDecimal(order.total_price) + parseDecimal(product.price) * parseInt(orderData.quantity)
    }
  });

  return prisma.orderItem.create({
    data: {
      order_id: parseInt(order_id),
      product_id: parseInt(orderData.product_id),
      quantity: parseInt(orderData.quantity),
      price: parseDecimal(product.price) * parseInt(orderData.quantity)
    }
  });
};

const deleteItem = async (order_id, order_item_id) => {
  const orderItem = await prisma.orderItem.findUnique({ where: { order_item_id: parseInt(order_item_id) } });
  const order = await prisma.order.findUnique({ where: { order_id: parseInt(order_id) } });

  await prisma.order.update({
    where: { order_id: parseInt(order_id) },
    data: {
      total_price: parseDecimal(order.total_price) - parseDecimal(orderItem.price)
    }
  });

  return prisma.orderItem.delete({
    where: { order_item_id: parseInt(order_item_id) }
  });
};

const getTotal = async(order_id) => {
  const order = await prisma.order.findUnique({
    where: {order_id: parseInt(order_id)}, 
    include: {
      total_price: true // select says only total price is returned?
    }
  });
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
