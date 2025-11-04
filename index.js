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
let cors = require('cors');
const enquiryRouter = require('./App/routes/web/enquiryRoutes');
require('dotenv').config();

let app = express();
app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send({
    status: 1,
    message: "API is running!",
    endpoints: {
      insert: "POST /api/website/enquiry/insert",
      view: "GET /api/website/enquiry/view"
    }
  });
});

app.use('/api/website/enquiry', enquiryRouter);

// MongoDB connection
const db = process.env.DBURL;

mongoose.connect(db)
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((err) => {
    console.error("❌ DB Connection Error:", err);
  });

// Vercel ke liye export karo
module.exports = app;

// Local development ke liye
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
}