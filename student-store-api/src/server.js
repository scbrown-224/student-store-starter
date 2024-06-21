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

app.listen(3000, () => console.log(`Server is running on http://localhost:${port}`));
