const express = require("express");
const router = express.Router();
const productController = require('../controllers/productController')

// get all the products
router.get("/", productController.getAllProducts);
//get product by ID
router.get("/:id", productController.getProductById);
//add a new product
router.post("/", productController.createProduct);
//create a new car
router.put("/:id", productController.updateProduct);
//delete a car
router.delete("/:id", productController.deleteProduct);

module.exports = router;