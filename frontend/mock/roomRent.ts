export interface PropertyMedia {
	cover: string; // single main image
	images: string[]; // gallery images
	videos: string[]; // video URLs
}

export interface PropertyLocation {
	address: string;
	latitude: number;
	longitude: number;
}

export interface PropertyExtra {
	[key: string]: boolean | undefined;
}

export type RoomRentProperty = {
	id: string | number;
	title: string;
	propertyType: "SINGLE ROOM" | "SHARED ROOM" | "MASTER ROOM" | "STUDIO";
	isNew: boolean;

	media: PropertyMedia;

	location: PropertyLocation;

	price: {
		rent: number; // monthly rent
		deposit?: number;
		minContractMonths?: number;
		availableFrom?: string; // ISO date string or formatted date
	};

	roommateInfo?: {
		totalSpots: number;
		occupiedSpots: number;
		preferences?: string; // e.g., "Any"
	};

	amenities: PropertyExtra; // e.g., ["WiFi", "A/C", "Washing Machine"]
	houseRules: PropertyExtra; // e.g., ["No smoking", "No pets"]
	description?: string; // About text

	agent: {
		profileImage: string;
		name: string;
		phone: string;
	};

	reserveCoins?: number; // e.g., 5
};

export const MOCK_ROOM_RENT: RoomRentProperty[] = [
	{
		id: 1,
		title: "Cozy Single Room near BTS Thonglor",
		propertyType: "SINGLE ROOM",
		isNew: true,
		media: {
			cover: "http://localhost:3000/uploads/roomRent/one/oneCover.jpg",
			images: ["http://localhost:3000/uploads/roomRent/one/oneGallery1.jpg"],
			videos: ["http://localhost:3000/uploads/roomRent/one/oneVideo.mp4"],
		},
		location: {
			address: "Thonglor Soi 13, Watthana",
			latitude: 13.7367,
			longitude: 100.5686,
		},
		price: {
			rent: 8000,
			deposit: 16000,
			minContractMonths: 6,
			availableFrom: "2026-05-01",
		},
		roommateInfo: {
			totalSpots: 3,
			occupiedSpots: 2,
			preferences: "Any",
		},
		amenities: {
			WiFi: true,
			AC: true,
			WashingMachine: true,
			Kitchen: true,
			Furniture: true,
		},
		houseRules: {
			NoSmoking: true,
			NoPets: true,
			QuietAfter10PM: true,
		},
		description:
			"Bright and clean private room in a shared apartment. 5-minute walk to BTS Thonglor. Quiet neighborhood.",
		agent: {
			profileImage: "agents/agent1.jpg",
			name: "John Doe",
			phone: "+66 123 4567",
		},
		reserveCoins: 5,
	},
	{
		id: 2,
		title: "Modern Studio in Central Sukhumvit",
		propertyType: "STUDIO",
		isNew: false,
		media: {
			cover: "http://localhost:3000/uploads/roomRent/two/twoCover.jpg",
			images: ["http://localhost:3000/uploads/roomRent/two/twoGallery1.jpg"],
			videos: ["http://localhost:3000/uploads/roomRent/two/twoVideo.mp4"],
		},
		location: {
			address: "Sukhumvit Soi 21, Khlong Toei",
			latitude: 13.7305,
			longitude: 100.5698,
		},
		price: {
			rent: 12000,
			deposit: 24000,
			minContractMonths: 12,
			availableFrom: "2026-06-01",
		},
		amenities: {
			WiFi: true,
			AC: true,
			Kitchen: true,
			Furniture: true,
		},
		houseRules: {
			NoSmoking: true,
			NoPets: true,
		},
		description:
			"Compact studio apartment in the heart of Sukhumvit. Ideal for single professionals.",
		agent: {
			profileImage: "agents/agent2.jpg",
			name: "Jane Smith",
			phone: "+66 987 6543",
		},
		reserveCoins: 8,
	},
	{
		id: 3,
		title: "Shared Master Room near Rama 9",
		propertyType: "MASTER ROOM",
		isNew: true,
		media: {
			cover: "http://localhost:3000/uploads/roomRent/three/threeCover.jpg",
			images: [
				"http://localhost:3000/uploads/roomRent/three/threeGallery1.jpg",
			],
			videos: ["http://localhost:3000/uploads/roomRent/three/threeVideo.mp4"],
		},
		location: {
			address: "Rama 9 Soi 45, Huai Khwang",
			latitude: 13.7612,
			longitude: 100.569,
		},
		price: {
			rent: 10000,
			deposit: 20000,
			minContractMonths: 6,
			availableFrom: "2026-05-15",
		},
		roommateInfo: {
			totalSpots: 2,
			occupiedSpots: 1,
			preferences: "Female",
		},
		amenities: {
			WiFi: true,
			AC: true,
			WashingMachine: true,
			Kitchen: true,
			Furniture: true,
		},
		houseRules: {
			NoSmoking: true,
			NoPets: true,
			QuietAfter10PM: true,
		},
		description:
			"Spacious master room with private bathroom in a shared apartment. Close to Rama 9 MRT.",
		agent: {
			profileImage: "agents/agent3.jpg",
			name: "Somchai Lee",
			phone: "+66 555 6789",
		},
		reserveCoins: 6,
	},
];
