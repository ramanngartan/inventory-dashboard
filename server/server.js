
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'

import productRoutes from './routes/productRoutes.js';
import authRoutes from './routes/authRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

app.use("/products", productRoutes);
app.use("/auth", authRoutes);
app.use("/dashboard", dashboardRoutes);


const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

mongoose
    .connect(MONGO_URL)
    .then(() => {
        console.log("MongoDB connected");

        app.listen(PORT, () => console.log(`server listening on ${PORT}`))
    })
    .catch((err) => console.log(err))