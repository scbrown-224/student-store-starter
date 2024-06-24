// import product model
const productModel = require('../models/product');

// function gets all products
const getAllProducts = async (req, res) => {
    try {
        const products = await productModel.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// get product by ID
const getProductById = async (req, res) => {
    try {
      const product = await productModel.getProductById(req.params.id);
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ error: "Product not found" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  //Function to create a new product
const createProduct = async (req, res) => {
    const productData = req.body;
    try {
      const newProduct = await productModel.createProduct(req.body);
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  //Function to update a product
const updateProduct = async (req, res) => {
    try {
      const updatedProduct = await productModel.updateProduct(req.params.id, req.body);
      if (updatedProduct) {
        res.status(200).json(updatedProduct);
      } else {
        res.status(404).json({ error: "Product not found" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  //Function to delete a product
const deleteProduct = async (req, res) => {
    try {
      const deleteProduct = await productModelModel.deleteProduct(req.params.id);
      if (deleteProduct) {
        res.status(200).json(deleteProduct);
      } else {
        res.status(404).json({ error: "Product not found" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  module.exports = {
    getAllProducts, 
    getProductById, 
    createProduct, 
    updateProduct, 
    deleteProduct
  }
  