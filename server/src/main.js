const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { clerkMiddleware } = require('@clerk/express');
const bodyParser = require('body-parser');
const apiRoute = require('./routes/apiRoute.js');
const authRoute = require('./routes/authRoute.js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Clerk middleware
app.use(cors({
    origin: true,
    credentials: true,
}));
app.use(express.json());
app.use(morgan('dev'));
app.use(clerkMiddleware());
app.use(bodyParser.json());

app.use("/auth", authRoute);
app.use("/api", apiRoute);


app.listen(PORT, () =>
    console.log(`✅ Server running on http://localhost:${PORT}`)
);
