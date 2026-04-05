import db from "../config/db";

export interface Feature {
	id: number;
	name: string;
}

export const FeatureModel = {
	async getAll(): Promise<Feature[]> {
		const [rows] = await db.query("SELECT * FROM features");
		return rows as Feature[];
	},

	async getByPropertyId(propertyId: number): Promise<Feature[]> {
		const [rows] = await db.query(
			`SELECT f.id, f.name
    FROM features f
    JOIN property_features pf ON pf.feature_id = f.id
    WHERE pf.property_id = ?`,
			[propertyId],
		);
		return rows as Feature[];
	},

	async addToProperty(propertyId: number, featureIds: number[]) {
		if (!featureIds.length) return;
		const inserts = featureIds.map((id) => [propertyId, id]);
		await db.query(
			"INSERT INTO property_features (property_id, feature_id) VALUES ?",
			[inserts],
		);
	},
};
