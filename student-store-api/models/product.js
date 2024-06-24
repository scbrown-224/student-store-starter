const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// get all products
// Function gets all the cars
const getAllProducts = async () => {
    return prisma.product.findMany();
  };

// get product by ID
const getProductById = async (id) => {
    return prisma.product.findUnique({ where: { id: parseInt(id) } });
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
const deleteProduct = async (id) => {
    return prisma.product.delete({ where: { id: parseInt(id) } });
};

// export the functions
module.exports = {
    getAllProducts, 
    getProductById, 
    createProduct, 
    updateProduct, 
    deleteProduct
};