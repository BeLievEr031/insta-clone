import express from "express"
import dotenv from "dotenv"
import helmet from "helmet"
import cookieParser from "cookie-parser"
import { rateLimit } from "express-rate-limit"
import cors from 'cors'
dotenv.config();

const app = express();
app.use(cors({
    origin: "*",
    credentials: true
}))

// Rate limiter to avoid misuse of the service and avoid cost spikes
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 500, // Limit each IP to 500 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: "Too many request"
    // handler: (_, __, ___, options) => {
    //     throw new ApiError(
    //         options.statusCode || 500,
    //         `There are too many requests. You are only allowed ${options.max
    //         } requests per ${options.windowMs / 60000} minutes`
    //     );
    // },
});

// Apply the rate limiting middleware to all requests
app.use(limiter);
app.use(helmet())
app.use(express.json({ limit: "100kb" }))
app.use(express.urlencoded({ extended: true, limit: '100kb' }))
app.use(cookieParser())

app.listen(5000, () => {
    console.log("Connected to the server.")
})