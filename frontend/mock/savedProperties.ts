export interface PropertyMedia {
	type: string;
	url: string;
	sort_order: number;
}

export interface Feature {
	id: number;
	name: string;
}

export interface Agent {
	id: number;
	profile_image?: string;
	name: string;
	phone: string;
	email?: string;
	experience: string;
	languages?: string; // can be parsed as array later
	bio?: string;
	rating?: number;
	reviews_count?: number;
	created_at?: string;
	updated_at?: string;
}

export interface Property {
	id?: number;
	name: string;
	typeLabel: string;
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
	agent?: Agent;
	owner_id?: number;
	floor_current?: number;
	floor_total?: number;
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

	media?: PropertyMedia[];
	features?: Feature[];
}

export const MOCK_SAVED_PROPERTIES: Property[] = [
	{
		id: 101,
		name: "Luxury Condo near BTS",
		location_text: "Bangkok, Sukhumvit",
		type: "condo",
		typeLabel: "Buy/Sell",
		price: 8500000,
		bedrooms: 2,
		bathrooms: 1,
		media: [
			{
				type: "cover",
				url: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae",
				sort_order: 1,
			},
			{
				type: "image",
				url: "https://images.unsplash.com/photo-1523217582562-09d0def993a6",
				sort_order: 2,
			},
		],
	},
	{
		id: 102,
		name: "Modern Pool Villa",
		location_text: "Phuket, Patong",
		type: "house",
		typeLabel: "Room Rent",
		price: 12500000,
		bedrooms: 3,
		bathrooms: 2,
		media: [
			{
				type: "cover",
				url: "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
				sort_order: 1,
			},
			{
				type: "image",
				url: "https://images.unsplash.com/photo-1572120360610-d971b9c7c2e8",
				sort_order: 2,
			},
		],
	},
	{
		id: 103,
		name: "Cozy Studio in City Center",
		location_text: "Chiang Mai, Nimmanhaemin",
		type: "condo",
		typeLabel: "Buy/Sell",
		price: 4200000,
		bedrooms: 1,
		bathrooms: 1,
		media: [
			{
				type: "cover",
				url: "https://images.unsplash.com/photo-1493809842364-78817add7ffb",
				sort_order: 1,
			},
			{
				type: "image",
				url: "https://images.unsplash.com/photo-1533777324565-a040eb52f1b3",
				sort_order: 2,
			},
		],
	},
	{
		id: 104,
		name: "Elegant Townhouse",
		location_text: "Bangkok, Ari",
		type: "townhouse",
		typeLabel: "Owner-Direct",
		price: 9800000,
		bedrooms: 3,
		bathrooms: 2,
		media: [
			{
				type: "cover",
				url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
				sort_order: 1,
			},
		],
	},
	{
		id: 105,
		name: "Seaside Condo",
		location_text: "Pattaya, Jomtien",
		type: "condo",
		typeLabel: "Off-Plan",
		price: 5600000,
		bedrooms: 1,
		bathrooms: 1,
		media: [
			{
				type: "cover",
				url: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914",
				sort_order: 1,
			},
		],
	},
];
