import { create } from "zustand";
import { API_BASE_URL } from "@/config/api";

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

interface PropertyState {
	properties: Property[];
	loading: boolean;
	error: string | null;
	fetchProperties: () => Promise<void>;
}

export const usePropertyStore = create<PropertyState>((set) => ({
	properties: [],
	loading: false,
	error: null,

	fetchProperties: async () => {
		set({ loading: true, error: null });
		try {
			const res = await fetch(`${API_BASE_URL}/api/properties`);
			if (!res.ok) throw new Error("Failed to fetch properties");

			const data: Property[] = await res.json();
			set({ properties: data });
		} catch (err: any) {
			set({ error: err.message || "Unknown error" });
		} finally {
			set({ loading: false });
		}
	},
}));
