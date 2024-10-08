const express = require('express');
const bodyParser = require('body-parser');
const bfhlRoute = require('./routes/bfhlRoute');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Call the cors function
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/bfhl', bfhlRoute);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
