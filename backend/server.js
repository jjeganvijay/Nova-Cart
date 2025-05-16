import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

const app = express();

// ✅ Correct PORT usage for Render
const PORT = process.env.PORT || 4000;

// ✅ Connect to DB and Cloudinary
connectDB();
connectCloudinary();

// ✅ Middleware
app.use(express.json());
app.use(cors());

// ✅ Routes
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

// ✅ Root route for health check
app.get('/', (req, res) => {
  res.send('API is up and running 🚀');
});

// ✅ Start the server (must log success for Render)
app.listen(PORT, () => {
  console.log(`✅ Server started on PORT: ${PORT}`);
});
