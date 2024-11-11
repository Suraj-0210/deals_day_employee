import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectToMongo from "./config/dbConfig.js";
import loginRoutes from "./routes/loginRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";

const app = express();
dotenv.config();

// Middleware to parse JSON
app.use(express.json());

// Enable CORS for all requests or specify your frontend origin
app.use(
  cors({
    origin: "http://localhost:5173", // Frontend URL
    credentials: true, // To allow cookies if needed
  })
);

const PORT = process.env.PORT || 3001;

// Routes
app.use("/api/auth", loginRoutes);
app.use("/api/employee", employeeRoutes);

app.get("/", (req, res) => {
  res.send("You are good to go");
});

app.listen(PORT, () => {
  console.log(`Server is Up and Running on PORT: ${PORT}`);
  connectToMongo();
});
