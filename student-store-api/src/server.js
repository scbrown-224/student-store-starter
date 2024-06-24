const express = require("express");
const port = 3000;
const cors = require("cors");
const morgan = require("morgan");

//import the productRoutes
const productRoutes = require("../routes/productRoutes");

// Middleware
const app = express();
app.use(cors()); // Enable CORS middleware to handle cross-origin requests
app.use(morgan("dev"));
app.use(express.json()); //Enable the use of JSON data

app.get("/", (req, res) => {
  res.send("Hello from the backend -- You are currently at the / route");
});

//add product routes here
app.use("/products", productRoutes);

app.listen(port, () => {
  console.log(`Server is up and running on PORT: ${port}`);
});