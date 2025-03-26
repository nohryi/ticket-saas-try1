import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ticketRoutes from "./routes/tickets";

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// CORS configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [
  "http://localhost:3000",
];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Ticket routes
app.use("/api/tickets", ticketRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
