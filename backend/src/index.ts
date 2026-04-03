import express from "express";
import { config } from "./config";
import path from "path";

const app = express();

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.get("/", (req, res) => {
	res.send("Server running");
});

const PORT = config.port;
app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
});
