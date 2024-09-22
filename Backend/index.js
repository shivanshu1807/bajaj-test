const express = require('express');
const bodyParser = require('body-parser');
const bfhlRoute = require('./routes/bfhlRoute');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Authentication Middleware
const authenticateJWT = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Get token from Authorization header
    if (!token) return res.sendStatus(403); // Forbidden

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // Forbidden
        req.user = user; // Save user info in request
        next();
    });
};

// Routes
app.use('/bfhl', authenticateJWT, bfhlRoute); // Protecting the bfhl route

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
