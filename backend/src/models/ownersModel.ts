import db from "../config/db";

export interface Owner {
	id?: number;
	profile_image?: string;
	name: string;
	phone: string;
	email?: string;
	bio?: string;
}

export const getAllOwners = async (): Promise<Owner[]> => {
	const [rows] = await db.query("SELECT * FROM owners");
	return rows as Owner[];
};

export const getOwnerById = async (id: number): Promise<Owner | null> => {
	const [rows] = await db.query("SELECT * FROM owners WHERE id = ?", [id]);
	const result = rows as Owner[];
	return result.length ? result[0] : null;
};

export const createOwner = async (owner: Owner): Promise<number> => {
	const { profile_image, name, phone, email, bio } = owner;
	const [result] = await db.query(
		`INSERT INTO owners (profile_image, name, phone, email, bio) VALUES (?, ?, ?, ?, ?)`,
		[profile_image, name, phone, email, bio],
	);
	const insertResult = result as any;
	return insertResult.insertId;
};

export const updateOwner = async (id: number, owner: Owner): Promise<void> => {
	const { profile_image, name, phone, email, bio } = owner;
	await db.query(
		`UPDATE owners SET profile_image = ?, name = ?, phone = ?, email = ?, bio = ? WHERE id = ?`,
		[profile_image, name, phone, email, bio, id],
	);
};

export const deleteOwner = async (id: number): Promise<void> => {
	await db.query("DELETE FROM owners WHERE id = ?", [id]);
};
