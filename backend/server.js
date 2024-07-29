const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const multer = require('multer');
const path = require('path');
const cookieParser = require('cookie-parser');

// Load environment variables
dotenv.config();

// Route imports (assuming separate files for each route)
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const postRoute = require('./routes/posts');
const commentRoute = require('./routes/comments');

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB is connected successfully!!');
  } catch (err) {
    console.error(err);
    process.exit(1); // Exit process on connection error
  }
};

// Initialize app
const app = express();

// Middlewares
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'backend/images')));
app.use(cookieParser());

// Mount route handlers
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/comments', commentRoute);

app.use(express.static(path.join(__dirname, 'frontend/dist')));

// Serve frontend files (assuming a single-page application)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

// Image upload configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    // Consider using a unique filename generation strategy
    cb(null, req.body.img || Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

app.post('/api/upload', upload.single('file'), (req, res) => {
  res.status(200).json('Image has been uploaded successfully!!');
});

// Start server
const PORT = process.env.PORT || 5000; // Use environment variable or default

app.listen(PORT, () => {
  connectDB();
  console.log(`App is running on port ${PORT}`);
});
