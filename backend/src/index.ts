import express from "express";
import { config } from "./config";
import path from "path";
import agentRoutes from "./routes/agents";
import ownerRoutes from "./routes/owners";
import propertyRoutes from "./routes/properties";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.get("/", (req, res) => {
	res.send("Server running");
});

app.use("/api/agents", agentRoutes);
app.use("/api/owners", ownerRoutes);
app.use("/api/properties", propertyRoutes);

const PORT = config.port;
app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
});
