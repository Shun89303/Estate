import express from "express";
import { config } from "./config";

const app = express();

app.use(express.json());
app.get("/", (req, res) => {
	res.send("Server running");
});

const PORT = config.port;
app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
});
