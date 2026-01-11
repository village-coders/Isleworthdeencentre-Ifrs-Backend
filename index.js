// index.js
const express = require('express');
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require('dotenv');
// const cookieParser = require('cookie-parser');

// Load environment variables
dotenv.config();
require("./Config/connectToDb");

// Routers
const newsRouter = require('./Routes/newsRouter');
const authRouter = require('./Routes/authRouter');
const facebookRouter = require('./Routes/facebookRouter');
const galleryRouter = require('./Routes/galleryRouter');


// Middleware
const errorHandler = require('./Middlewares/errorHandler');

const clientDomain = process.env.client_domain || "http://127.0.0.1:5501";

// 🔐 CORS configuration
app.use(cors({
  origin: clientDomain,   // only used for CORS, never for routes
  // credentials: true
}));

// Parse JSON & urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// Logging
app.use(morgan("dev"));

// Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to Isleworth Deen Centre API version 1.0");
});

// 🔹 Mount routers using RELATIVE paths only
app.use("/api/news", newsRouter);
app.use("/api/auth", authRouter);
app.use("/api/facebook", facebookRouter);
app.use("/api/gallery", galleryRouter);

// 404 catch-all for undefined routes
app.all("/{*any}", (req, res) => {
  res.status(404).json({
    status: "error",
    message: `${req.method} ${req.originalUrl} is not an endpoint on this server.`
  });
});

// Global error handler (no path here!)
app.use(errorHandler);


