import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import cookieParser from "cookie-parser"

import productsRoute from "./routes/products.js"

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
});

const app = express();
dotenv.config();


const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("connected to mongodb");
    } catch (error) {
        throw error;
    }

};

mongoose.connection.on("diconnected", () => {
    console.log("mongodb diconnected");
})

// middlewares
app.use(cookieParser())
app.use(express.json());

app.use("/api/products", productsRoute);

app.use((err, req, res, next) => {
    // return res.status(500).json("Hello from error handler")
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,

    })

})

app.get("/", (req, res) => {
    res.send("hello first request");
})

const server = app.listen(8800, () => {
    connect();
    console.log("connected to backend");
})


// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

    server.close(() => {
        process.exit(1);
    });
});