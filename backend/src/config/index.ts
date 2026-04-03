import dotenv from "dotenv";
dotenv.config();

export const config = {
	port: process.env.PORT || 3000,
	dbHost: process.env.DB_HOST || "localhost",
	dbUser: process.env.DB_USER || "root",
	dbPassword: process.env.DB_PASSWORD || "",
	dbName: process.env.DB_NAME || "pandora_property",
};
