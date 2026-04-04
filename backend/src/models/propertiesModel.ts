import db from "../config/db";

export interface Property {
	id?: number;
	name: string;
	location_text: string;
	latitude?: number;
	longitude?: number;
	price?: number;
	price_min?: number;
	price_max?: number;
	price_type?: "total" | "monthly" | "daily" | "hourly";
	listing_type?: "buy" | "rent_room" | "off_plan" | "business";
	property_category?: "residential" | "business";
	type?: "condo" | "house" | "townhouse" | "penthouse";
	bedrooms?: number;
	bathrooms?: number;
	area?: number;
	is_new?: boolean;
	posted_by?: "agent" | "owner";
	agent_id?: number;
	owner_id?: number;
	description?: string;
	// Room Rent
	room_type?: "single" | "shared" | "master" | "studio";
	roommate_taken?: number;
	roommate_total?: number;
	contract_months?: number;
	deposit?: number;
	available_from?: string; // YYYY-MM-DD
	gender_preference?: "any" | "male" | "female";
	// Business
	business_type?:
		| "office"
		| "co_working"
		| "shop_retail"
		| "meeting_room"
		| "warehouse"
		| "restaurant"
		| "event_venue";
	capacity?: number;
	// Off-Plan
	off_plan?: boolean;
	developer_name?: string;
	completion_quarter?: string;
	rental_yield_percent?: number;
	annual_growth_percent?: number;
	available_units?: number;
	total_units?: number;
	// Owner Direct
	contact_name?: string;
	contact_phone?: string;
	contact_image?: string;
	is_contact_locked?: boolean;
	unlock_cost?: number;
	created_at?: string;
	updated_at?: string;
}

export const PropertyModel = {
	async getAll(): Promise<Property[]> {
		const [rows] = await db.query("SELECT * FROM properties");
		return rows as Property[];
	},

	async getById(id: number): Promise<Property | null> {
		const [rows] = await db.query("SELECT * FROM properties WHERE id = ?", [
			id,
		]);
		return (rows as Property[])[0] || null;
	},

	async create(data: Property): Promise<number> {
		const [result] = await db.query("INSERT INTO properties SET ?", [data]);
		return (result as any).insertId;
	},

	async addMedia(
		propertyId: number,
		media: { type: string; url: string; sort_order?: number }[],
	) {
		if (media.length === 0) return;

		const mediaInserts = media.map((m) => [
			propertyId,
			m.type,
			m.url.replace(/\\/g, "/"),
			m.sort_order ?? 0,
		]);

		await db.query(
			`INSERT INTO property_media (property_id, type, url, sort_order) VALUES ?`,
			[mediaInserts],
		);
	},

	async update(id: number, data: Partial<Property>): Promise<void> {
		await db.query("UPDATE properties SET ? WHERE id = ?", [data, id]);
	},

	async delete(id: number): Promise<void> {
		await db.query("DELETE FROM properties WHERE id = ?", [id]);
	},
};
