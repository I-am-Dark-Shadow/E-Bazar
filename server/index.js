import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import helmet from 'helmet'
import connectDB from './config/connectDB.js'
import userRouter from './routes/user.route.js'
import dotenv from 'dotenv'
import categoryRouter from './routes/category.route.js'
import uploadRouter from './routes/upload.route.js'
import subCategoryRouter from './routes/subCategory.route.js'
import productRouter from './routes/product.route.js'
import cartRouter from './routes/cart.route.js'
import addressRouter from './routes/address.route.js'
import orderRouter from './routes/order.route.js'

dotenv.config()

const app = express()
const PORT = 8080 || process.env.PORT 

app.get("/",(req,res)=>{
    ///server to client
    res.json({
        message : "Server is running " + PORT
    })
})

// Middleware (Order Matters)
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
}))

app.use(express.json())  // JSON parsing middleware must be before the routes
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(helmet({
    crossOriginResourcePolicy: false
}))
app.use(morgan("dev"))  // Fixed Morgan deprecation warning

// User Routes
app.use('/api/user', userRouter)


// category Routes
app.use("/api/category", categoryRouter)

// sub category Routes
app.use("/api/sub-category", subCategoryRouter)

// upload image route
app.use("/api/file", uploadRouter)

// product Routes
app.use("/api/product", productRouter)

// cart Routes 
app.use("/api/cart", cartRouter)

// address Routes
app.use("/api/address", addressRouter)

// order Routes
app.use("/api/order", orderRouter)





// Connect to DB and Start Server
connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("Server is running",PORT)
    })
})
