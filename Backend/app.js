import express from "express";
import cors from "cors";
import "dotenv/config";
import connectionDB from "./db/connectDb.js";
import path from "path";
import userRouter from "./routes/userRoutes.js";
import investmentRouter from "./routes/investmentRoutes.js";
import fundRoutes from "./routes/fundRoutes.js";
import axios from "axios";
const PORT = process.env.PORT || 5000;

connectionDB();
const app = express();

app.use(express.json());
const __dirname = path.resolve();
app.use("/api/public", express.static(path.join(__dirname, "./public")));
app.use(cors());

app.get("/stocks", async (req, res) => {
  try {
    // Make a GET request to Yahoo Finance using Axios
    const response = await axios.get(
      "https://query1.finance.yahoo.com/v8/finance/chart/AAPL",
      {
        headers: {
          Accept: "application/json, text/plain, */*",
          "User-Agent": "axios/1.5.1",
          "Accept-Encoding": "gzip, compress, deflate, br",
        },
      }
    );

   
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// Routes
app.use("/api/users", userRouter);
app.use("/api/invest", investmentRouter);
app.use("api/fund", fundRoutes);

app.listen(PORT, () => {
  console.log(`Server is runing PORT:${PORT}`);
});
