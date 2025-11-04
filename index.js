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

// ✅ Step 1: Use explicit CORS config
app.use(cors({
  origin: [
    "https://full-stack-project-frontend-gray.vercel.app",
    "http://localhost:5173"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// ✅ Step 2: Handle preflight requests
app.options("*", cors());

app.use(express.json());
app.use('/api/website/enquiry', enquiryRouter);

const db = process.env.DBURL;

mongoose.connect(db)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB Connection Error:", err);
  });
