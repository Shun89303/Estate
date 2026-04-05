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

	async getAllWithMediaFeaturesAndAgents() {
		// 1. Fetch all properties
		const [properties] = await db.query("SELECT * FROM properties");

		// 2. Fetch all media
		const [mediaRows] = await db.query("SELECT * FROM property_media");
		const mediaMap: Record<number, any[]> = {};
		(mediaRows as any[]).forEach((m) => {
			if (!mediaMap[m.property_id]) mediaMap[m.property_id] = [];
			mediaMap[m.property_id].push({
				type: m.type,
				url: m.url.replace(/\\/g, "/"),
				sort_order: m.sort_order,
			});
		});

		// 3. Fetch all features
		const [featureRows] = await db.query(`
    SELECT pf.property_id, f.id, f.name
    FROM property_features pf
    JOIN features f ON f.id = pf.feature_id
`);
		const featureMap: Record<number, any[]> = {};
		(featureRows as any[]).forEach((f) => {
			if (!featureMap[f.property_id]) featureMap[f.property_id] = [];
			featureMap[f.property_id].push({ id: f.id, name: f.name });
		});

		// 4. Fetch all agents
		const [agentRows] = await db.query("SELECT * FROM agents");
		const agentMap: Record<number, any> = {};
		(agentRows as any[]).forEach((a) => {
			agentMap[a.id] = {
				id: a.id,
				profile_image: a.profile_image,
				name: a.name,
				phone: a.phone,
				email: a.email,
				experience: a.experience,
				languages: a.languages,
				bio: a.bio,
				rating: a.rating,
				reviews_count: a.reviews_count,
				created_at: a.created_at,
				updated_at: a.updated_at,
			};
		});

		// 5. Combine all data for each property
		return (properties as any[]).map((p) => ({
			...p,
			media: mediaMap[p.id!] || [],
			features: featureMap[p.id!] || [],
			agent: p.agent_id ? agentMap[p.agent_id] : undefined,
		}));
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
