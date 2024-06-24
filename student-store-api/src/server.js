const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
// Example product data
let products = [
    { id: 1, name: 'zebra', category: 'electronics', price: 100 },
    { id: 2, name: 'apple', category: 'books', price: 50 },
    { id: 3, name: 'watermelon', category: 'electronics', price: 200 },
    { id: 4, name: 'product 4', category: 'books', price: 30 }
];


app.get('/', (req, res) => {
    res.send('hello world :)')
})


app.get('/products', (req, res) => {
    let filteredProducts = products;

    if(req.query.category) {
        filteredProducts = filteredProducts.filter((product) => product.category.toLowerCase() === req.query.category.toLowerCase())
    }
    // .sort can do alphabetical
    if(req.query.sort) {
        const sortBy = req.query.sort;
        filteredProducts = filteredProducts.sort((a, b) => {
            
            const aValue = a[sortBy];
            const bValue = b[sortBy];

            if (typeof aValue === 'string' && typeof bValue === 'string') {
                return aValue.toLowerCase().localeCompare(bValue.toLowerCase());
            }
            
            // use brackets instead of . for when the property name is dynamic
            // ie how u can sort by different things
            if(a[sortBy] < b[sortBy]) {
                // negative comes before positive
                // 0 they don't switch positions
                return -1;
            }
            if(a[sortBy] > b[sortBy]) {
                return 1;
            }
            return 0;
        });
    }
    res.json(filteredProducts);
})


let orders = [
    {
      "order_id": 1,
      "customer_id": 101,
      "total_price": 250.75,
      "status": "completed",
      "created_at": "2024-06-20T14:48:00.000Z"
    },
    {
      "order_id": 2,
      "customer_id": 102,
      "total_price": 150.00,
      "status": "pending",
      "created_at": "2024-06-21T09:20:00.000Z"
    },
    {
      "order_id": 3,
      "customer_id": 103,
      "total_price": 99.99,
      "status": "shipped",
      "created_at": "2024-06-19T11:30:00.000Z"
    },
    {
      "order_id": 4,
      "customer_id": 104,
      "total_price": 450.50,
      "status": "cancelled",
      "created_at": "2024-06-18T15:15:00.000Z"
    },
    {
      "order_id": 5,
      "customer_id": 105,
      "total_price": 299.99,
      "status": "completed",
      "created_at": "2024-06-20T10:45:00.000Z"
    }
]

app.get('/orders', (req, res) => {
    res.json(orders);
})

  

app.post('/orders', (req, res) => {
    const {order_id, customer_id, total_price, status,  created_at} = req.body;

    const newOrder = {
        order_id: orders.length + 1, 
        customer_id, total_price, status,  created_at
    }

    orders.push(newOrder);
    res.status(201).json(newOrder);
})
  // may have to change total price later

// editing an existing order
app.put('/orders/:order_id', (req, res) => {
    const { order_id } = req.params;
    const orderIndex = orders.findIndex(order => order.order_id === parseInt(order_id));

    if(orderIndex !== -1) {
        const updatedOrderInfo = req.body;
        orders[orderIndex] = {...orders[orderIndex], ...updatedOrderInfo }
        res.json(orders[orderIndex])
    } else {
        res.status(404).json({ error: 'Order not found' });
    }
})

// delete
app.delete('/orders/:order_id', (req, res) => {
    const { order_id } = req.params;
    const initialLength = orders.length;
    orders = orders.filter(order => order.order_id !== parseInt(order_id));
 
    if(orders.length < initialLength) {
        res.status(204).send()
    } else {
        res.status(404).json({ error: 'Order not found' });
    }
})



app.listen(3000, () => console.log(`Server is running on http://localhost:${port}`));
