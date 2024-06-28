import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import SubNavbar from "../SubNavbar/SubNavbar";
import Sidebar from "../Sidebar/Sidebar";
import Home from "../Home/Home";
import ProductDetail from "../ProductDetail/ProductDetail";
import NotFound from "../NotFound/NotFound";
import { removeFromCart, addToCart, getQuantityOfItemInCart, getTotalItemsInCart } from "../../utils/cart";
import "./App.css";

const devUrl = "http://localhost:3000"

function App() {

  // State variables
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All Categories");
  const [searchInputValue, setSearchInputValue] = useState("");
  const [userInfo, setUserInfo] = useState({ id: "", email: ""});
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState(null);
/*
create new Order
*/


  useEffect(() => {
    setIsFetching(true)
    async function fetchProduct() {
      try {
        // get request to the backend api endpoint
        const response = await axios.get(`${devUrl}/products`);
        // setting the fetched data to the state variable products
        setProducts(response.data);
      }
      catch (error) {
        console.error("error fetching product", error)
      } finally {
        setIsFetching(false)
      }
    }
    fetchProduct()
  }, [])

  // Toggles sidebar
  const toggleSidebar = () => setSidebarOpen((isOpen) => !isOpen);

  // Functions to change state (used for lifting state)
  const handleOnRemoveFromCart = (item) => setCart(removeFromCart(cart, item));
  const handleOnAddToCart = (item) => setCart(addToCart(cart, item));
  const handleGetItemQuantity = (item) => getQuantityOfItemInCart(cart, item);
  const handleGetTotalCartItems = () => getTotalItemsInCart(cart);

  const handleOnSearchInputChange = (event) => {
    setSearchInputValue(event.target.value);
  };

  const handleOnCheckout = async () => {
    setIsCheckingOut(true);

    // creating a new order
    // this is the info we need in backend to post/create a new ordr
    const newOrder = {
      customer_id: parseInt(userInfo.id), 
      total_price: 0,
      status: 'in progress',
    };

    // post request to make a new order
    // newOrder is the data being sent to the url
    const response = await axios.post(`${devUrl}/orders`, newOrder);

    // get the data of the newly created order
    const data = response.data;
    console.log(data);
    // set the order state to the new data
    setOrder(data);

    // for of loop, iterate through each item in the cart
    for (const [key, value] of Object.entries(cart)) {
      // Create an order item object for each object in the cart with product ID and quantity
      const orderItem = {
        product_id: parseInt(key), 
        quantity: parseInt(value)
      };

      // post request to add an order to the item
      const postResponse = await axios.post(`${devUrl}/orders/${data.order_id}/items`, 
        orderItem
      );
      console.log(postResponse)

      // set the new status as completed
      const updatedOrder = {
        status: 'completed', 
      };

      // doing a put request to save the new status (edit)
      const putResponse = await axios.put(`${devUrl}/orders/${data.order_id}`, updatedOrder);
      console.log(putResponse)

      // a get request to get the new update
      const getResponse = await axios.get(`${devUrl}/orders/${data.order_id}`);

      // get the response data (the updated order details)
      const data2 = getResponse.data;
      console.log(data2)
      // set the order as the updated order details
      setOrder(data2);

    }
    // clears the cart
    setCart({});
    setIsCheckingOut(false);
  }

  
  
  return (
    <div className="App">
      <BrowserRouter>
        <Sidebar
          cart={cart}
          error={error}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          isOpen={sidebarOpen}
          products={products}
          toggleSidebar={toggleSidebar}
          isCheckingOut={isCheckingOut}
          addToCart={handleOnAddToCart}
          removeFromCart={handleOnRemoveFromCart}
          getQuantityOfItemInCart={handleGetItemQuantity}
          getTotalItemsInCart={handleGetTotalCartItems}
          handleOnCheckout={handleOnCheckout}
          order={order}
          setOrder={setOrder}
        />
        <main>
          <SubNavbar
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            searchInputValue={searchInputValue}
            handleOnSearchInputChange={handleOnSearchInputChange}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  error={error}
                  products={products}
                  isFetching={isFetching}
                  activeCategory={activeCategory}
                  setActiveCategory={setActiveCategory}
                  addToCart={handleOnAddToCart}
                  searchInputValue={searchInputValue}
                  removeFromCart={handleOnRemoveFromCart}
                  getQuantityOfItemInCart={handleGetItemQuantity}
                />
              }
            />
            <Route
              path="/:productId"
              element={
                <ProductDetail
                  cart={cart}
                  error={error}
                  products={products}
                  addToCart={handleOnAddToCart}
                  removeFromCart={handleOnRemoveFromCart}
                  getQuantityOfItemInCart={handleGetItemQuantity}
                />
              }
            />
            <Route
              path="*"
              element={
                <NotFound
                  error={error}
                  products={products}
                  activeCategory={activeCategory}
                  setActiveCategory={setActiveCategory}
                />
              }
            />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
 