const express = require('express');
const mongoose = require('mongoose');
let cors = require('cors');
const enquiryRouter = require('./App/routes/web/enquiryRoutes');
require('dotenv').config();

let app = express();
app.use(cors())
app.use(express.json());

app.use('/api/website/enquiry',enquiryRouter)

// MongoDB connection
const db = process.env.DBURL;

mongoose.connect(db)
.then(() => {
  console.log("✅ Connected to MongoDB");

  // Start server after DB is connected
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
})
.catch((err) => {
  console.error("❌ DB Connection Error:", err);
});
