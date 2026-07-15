// import express from "express";
// import cors from "cors";
// import helmet from "helmet";
// import compression from "compression";
// import cookieParser from "cookie-parser";
// import loggerMiddleware from "./src/middleware/logger.middleware.js";
// import routes from "./src/routes/index.js";

// const app = express();

// // Body Parser
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // CORS
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );

// // Security
// app.use(helmet());

// // Compression
// app.use(compression());

// // Cookie Parser
// app.use(cookieParser());

// // Logger
// app.use(loggerMiddleware);


// app.use("/api/v1", routes);
// // Test Route
// app.get("/", (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: "🚀 Backend is Running...",
//   });
// });

// export default app;



import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";

import loggerMiddleware from "./src/middleware/logger.middleware.js";
import errorMiddleware from "./src/middleware/error.middleware.js";
import routes from "./src/routes/index.js";

const app = express();

// ==============================
// Body Parser
// ==============================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==============================
// CORS
// ==============================
// ✅ CORS Configured with Explicit Allowed Headers
app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        "http://localhost:5173",
        "http://localhost:5174"
      ];
      // Allow local development, specific domains, or any Vercel preview deployment
      if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.vercel.app') || origin.includes('techmaster-visitor-frontend')) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
  })
);

// ==============================
// Security
// ==============================
app.use(helmet());
// ✅ Helmet configured to not block local cross-origin data
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

// ==============================
// Compression
// ==============================
app.use(compression());

// ==============================
// Cookie Parser
// ==============================
app.use(cookieParser());

// ==============================
// Logger Middleware
// ==============================
app.use(loggerMiddleware);

// ==============================
// API Routes
// ==============================
app.use("/api", routes);

// ==============================
// Health Check Route
// ==============================
// API Routes
app.use("/api/v1", routes);

// Test Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 Backend is Running...",
  });
});

// ==============================
// Global Error Middleware
// ==============================
app.use(errorMiddleware);

export default app;
