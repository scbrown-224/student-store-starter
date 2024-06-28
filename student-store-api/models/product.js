const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// get all products
const getAllProducts = async (filter = {}, orderBy = {}) => {
    return prisma.product.findMany({
        include: {
            orderItems: true
        },
        where: filter,
        orderBy: orderBy
    });
  };



  // where - conditions that returned stuff must meet
  // orderBy - order in which they should be returned

// get product by ID
const getProductById = async (id) => {
    return prisma.product.findUnique({ where: { id: parseInt(id) }, include: {
        orderItems: true
    } });
};

// create new product
const createProduct = async (productData) => {
    return prisma.product.create({ data: productData });
};

// update a product
const updateProduct = async (id, productData) => {
    return prisma.product.update({
        where: {id: parseInt(id) }, 
        data: productData,
    });
};

// delete product
// const deleteProduct = async (id) => {
//     return prisma.product.delete({ where: { id: parseInt(id) } });
// };

const deleteProduct = async (id) => {
    return prisma.$transaction(async (prisma) => {
        // Delete related order items first
        await prisma.orderItem.deleteMany({
            where: { product_id: parseInt(id) },
        });
        // Delete the product
        return prisma.product.delete({
            where: { id: parseInt(id) },
        });
    });
};





// export the functions
module.exports = {
    getAllProducts, 
    getProductById, 
    createProduct, 
    updateProduct, 
    deleteProduct
};