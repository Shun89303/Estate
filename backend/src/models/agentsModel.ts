import db from "../config/db";

export interface Agent {
	id?: number;
	profile_image?: string;
	name: string;
	phone: string;
	email?: string;
	experience: "<1" | "1-3" | "3-5" | "5-10" | "10+";
	languages: string;
	bio?: string;
	rating?: number;
	reviews_count?: number;
}

export const getAllAgents = async (): Promise<Agent[]> => {
	const [rows] = await db.query("SELECT * FROM agents");
	return rows as Agent[];
};

export const getAgentById = async (id: number): Promise<Agent | null> => {
	const [rows] = await db.query("SELECT * FROM agents WHERE id = ?", [id]);
	const result = rows as Agent[];
	return result.length ? result[0] : null;
};

export const createAgent = async (agent: Agent): Promise<number> => {
	const {
		profile_image,
		name,
		phone,
		email,
		experience,
		languages,
		bio,
		rating,
		reviews_count,
	} = agent;
	const [result] = await db.query(
		`INSERT INTO agents 
    (profile_image, name, phone, email, experience, languages, bio, rating, reviews_count) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
		[
			profile_image,
			name,
			phone,
			email,
			experience,
			languages,
			bio,
			rating || 0,
			reviews_count || 0,
		],
	);
	const insertResult = result as any;
	return insertResult.insertId;
};

export const updateAgent = async (id: number, agent: Agent): Promise<void> => {
	const {
		profile_image,
		name,
		phone,
		email,
		experience,
		languages,
		bio,
		rating,
		reviews_count,
	} = agent;
	await db.query(
		`UPDATE agents SET 
    profile_image = ?, name = ?, phone = ?, email = ?, experience = ?, languages = ?, bio = ?, 
    rating = ?, reviews_count = ? 
    WHERE id = ?`,
		[
			profile_image,
			name,
			phone,
			email,
			experience,
			languages,
			bio,
			rating || 0,
			reviews_count || 0,
			id,
		],
	);
};

export const deleteAgent = async (id: number): Promise<void> => {
	await db.query("DELETE FROM agents WHERE id = ?", [id]);
};
