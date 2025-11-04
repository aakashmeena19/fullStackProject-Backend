// const express = require('express');
// const mongoose = require('mongoose');
// let cors = require('cors');
// const enquiryRouter = require('./App/routes/web/enquiryRoutes');
// require('dotenv').config();

// let app = express();
// app.use(cors())
// app.use(express.json());

// app.use('/api/website/enquiry',enquiryRouter)

// // MongoDB connection
// const db = process.env.DBURL;

// mongoose.connect(db)
// .then(() => {
//   console.log("✅ Connected to MongoDB");

//   // Start server after DB is connected
//   const PORT = process.env.PORT || 3000;
//   app.listen(PORT, () => {
//     console.log(`🚀 Server is running on port ${PORT}`);
//   });
// })
// .catch((err) => {
//   console.error("❌ DB Connection Error:", err);
// });


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const enquiryRouter = require('./App/routes/web/enquiryRoutes');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send({
    status: 1,
    message: "API is running!",
    mongodb: mongoose.connection.readyState === 1 ? 'Connected ✅' : 'Disconnected ❌',
    endpoints: {
      insert: "POST /api/website/enquiry/insert",
      view: "GET /api/website/enquiry/view",
      delete: "DELETE /api/website/enquiry/delete/:id",
      single: "GET /api/website/enquiry/single/:id",
      update: "PUT /api/website/enquiry/update/:id"
    }
  });
});

// API routes
app.use('/api/website/enquiry', enquiryRouter);

// MongoDB connection with improved options
const db = process.env.DBURL;

if (!db) {
  console.error("❌ DBURL environment variable is not set!");
} else {
  mongoose.connect(db, {
    serverSelectionTimeoutMS: 30000, // 30 seconds timeout
    socketTimeoutMS: 45000,
  })
  .then(() => {
    console.log("✅ Connected to MongoDB");
    console.log("📦 Database:", mongoose.connection.name);
  })
  .catch((err) => {
    console.error("❌ DB Connection Error:", err.message);
  });
}

// Handle MongoDB connection events
mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('⚠️ MongoDB disconnected');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    status: 0,
    message: "Internal Server Error",
    error: process.env.NODE_ENV === 'production' ? err.message : err.stack
  });
});

// Export for Vercel
module.exports = app;

// Local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}
