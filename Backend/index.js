const express = require('express');
const bodyParser = require('body-parser');
const bfhlRoute = require('./routes/bfhlRoute');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors);

// Routes
app.use('/bfhl', bfhlRoute);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
