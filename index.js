const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

dotenv.config();
app.use(cors());
app.use(express.json());

// Import your routes
const urlRouter = require('./routers/url');

// Keep POST creation under /api
app.use('/api', urlRouter);

// Allow redirect without /api
app.use('/', urlRouter);

// Connect to MongoDB
mongoose.connect(process.env.mongouri)
  .then(() => {
    console.log("successfully connected to mongo db");
  })
  .catch((error) => {
    console.log("failed to connect", error);
  });

// Start server
app.listen(3000, () => {
  console.log("server connected successfully.......... ");
});
