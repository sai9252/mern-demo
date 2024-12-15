import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import routes from "./routes/productRoutes.js";
import path from "path";

const app = express();

app.use(bodyParser.json());

dotenv.config();
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGODG = process.env.MONGODB_URL;

const __dirname = path.resolve();

mongoose.connect(MONGODG).then(() => {
    console.log("Database connected successfully.");
}).catch((error) => {
    console.log("Error in your DB", error);
});

app.use("/api/items/", routes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});