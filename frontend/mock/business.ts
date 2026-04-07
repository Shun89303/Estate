export type BusinessPropertyType =
	| "OFFICE"
	| "CO_WORKING"
	| "SHOP_RETAIL"
	| "WAREHOUSE"
	| "RESTAURANT"
	| "EVENT_VENUE";

export interface BusinessMedia {
	cover: string;
	photos: string[];
	videos: string[];
}

export interface BusinessLocation {
	address: string;
	latitude: number;
	longitude: number;
}

export interface BusinessContact {
	name: string;
	profileImage: string;
	phone: string;
}

export type BusinessPricing =
	| {
			type: "MONTHLY";
			amount: number; // 25000
			deposit: number;
	  }
	| {
			type: "DAILY";
			amount: number; // 30000
			deposit: number;
	  };

export interface BusinessFeatures {
	[key: string]: boolean | undefined;
}

export interface BusinessProperty {
	id: number;
	uniqueCode: string;

	// Media
	media: BusinessMedia;

	// Classification
	type: BusinessPropertyType;

	// Basic Info
	title: string;

	// Pricing
	pricing: BusinessPricing;

	// Space Details
	areaSqm: number; // 45
	capacity: number; // 8 people
	minLeaseMonths: number; // 12

	// Features
	amenities: BusinessFeatures;

	// Content
	about: string;

	// Geo
	location: BusinessLocation;

	// Contact
	contact: BusinessContact;

	// App Logic
	reserveCoins: number;
}

export const MOCK_BUSINESS: BusinessProperty[] = [
	{
		id: 1,
		uniqueCode: "PP-B2401",
		media: {
			cover: "http://localhost:3000/uploads/business/one/oneCover.jpg",
			photos: ["http://localhost:3000/uploads/business/one/oneGallery1.jpg"],
			videos: ["http://localhost:3000/uploads/business/one/oneVideo.mp4"],
		},
		type: "OFFICE",
		title: "Private Office at Silom",
		pricing: { type: "MONTHLY", amount: 25000, deposit: 50000 },
		areaSqm: 45,
		capacity: 8,
		minLeaseMonths: 12,
		amenities: {
			WiFi: true,
			"A/C": true,
			Reception: true,
			MeetingRoom: true,
			Pantry: true,
			"24/7 Access": true,
		},
		about:
			"Fully furnished private office in the heart of Silom business district. Includes meeting room access.",
		location: {
			address: "Silom Road, Bang Rak",
			latitude: 13.724,
			longitude: 100.534,
		},
		contact: {
			name: "John Doe",
			profileImage: "http://localhost:3000/uploads/owners/owner1.jpg",
			phone: "0912345678",
		},
		reserveCoins: 5,
	},
	{
		id: 2,
		uniqueCode: "PP-B2402",
		media: {
			cover: "http://localhost:3000/uploads/business/two/twoCover.jpg",
			photos: ["http://localhost:3000/uploads/business/two/twoGallery1.jpg"],
			videos: ["http://localhost:3000/uploads/business/two/twoVideo.mp4"],
		},
		type: "CO_WORKING",
		title: "Co-Working Space at Asoke",
		pricing: { type: "MONTHLY", amount: 12000, deposit: 24000 },
		areaSqm: 30,
		capacity: 10,
		minLeaseMonths: 6,
		amenities: { WiFi: true, "A/C": true, Pantry: true, "24/7 Access": true },
		about:
			"Shared co-working space with open seating, ideal for freelancers and startups.",
		location: {
			address: "Asoke Road, Sukhumvit",
			latitude: 13.737,
			longitude: 100.558,
		},
		contact: {
			name: "Jane Smith",
			phone: "0923456789",
			profileImage: "http://localhost:3000/uploads/owners/owner2.jpg",
		},
		reserveCoins: 3,
	},
	{
		id: 3,
		uniqueCode: "PP-B2403",
		media: {
			cover: "http://localhost:3000/uploads/business/three/threeCover.jpg",
			photos: [
				"http://localhost:3000/uploads/business/three/threeGallery1.jpg",
			],
			videos: ["http://localhost:3000/uploads/business/three/threeVideo.mp4"],
		},
		type: "SHOP_RETAIL",
		title: "Retail Shop at Chatuchak",
		pricing: { type: "DAILY", amount: 3500, deposit: 7000 },
		areaSqm: 20,
		capacity: 5,
		minLeaseMonths: 1,
		amenities: { WiFi: false, "A/C": true, "24/7 Access": false },
		about:
			"Small retail space near Chatuchak market, perfect for pop-up stores or boutiques.",
		location: {
			address: "Chatuchak Market, Bangkok",
			latitude: 13.803,
			longitude: 100.553,
		},
		contact: {
			name: "Somsak Chai",
			phone: "0934567890",
			profileImage: "http://localhost:3000/uploads/owners/owner3.jpg",
		},
		reserveCoins: 2,
	},
	{
		id: 4,
		uniqueCode: "PP-B2404",
		media: {
			cover: "http://localhost:3000/uploads/business/four/fourCover.jpg",
			photos: ["http://localhost:3000/uploads/business/four/fourGallery1.jpg"],
			videos: ["http://localhost:3000/uploads/business/four/fourVideo.mp4"],
		},
		type: "WAREHOUSE",
		title: "Warehouse in Bangna",
		pricing: { type: "MONTHLY", amount: 40000, deposit: 80000 },
		areaSqm: 200,
		capacity: 0,
		minLeaseMonths: 12,
		amenities: { "Loading Dock": true, Security: true },
		about: "Spacious warehouse suitable for storage or light industrial use.",
		location: {
			address: "Bangna-Trad Road, Bangkok",
			latitude: 13.657,
			longitude: 100.611,
		},
		contact: {
			name: "Nattapong Lee",
			phone: "0945678901",
			profileImage: "http://localhost:3000/uploads/owners/owner4.jpg",
		},
		reserveCoins: 6,
	},
	{
		id: 5,
		uniqueCode: "PP-B2405",
		media: {
			cover: "http://localhost:3000/uploads/business/five/fiveCover.jpg",
			photos: ["http://localhost:3000/uploads/business/five/fiveGallery1.jpg"],
			videos: ["http://localhost:3000/uploads/business/five/fiveVideo.mp4"],
		},
		type: "RESTAURANT",
		title: "Rooftop Restaurant at Thonglor",
		pricing: { type: "MONTHLY", amount: 80000, deposit: 160000 },
		areaSqm: 60,
		capacity: 40,
		minLeaseMonths: 12,
		amenities: {
			WiFi: true,
			"A/C": true,
			"Outdoor Seating": true,
			Kitchen: true,
		},
		about:
			"Stylish rooftop restaurant with city views, suitable for fine dining and events.",
		location: {
			address: "Thonglor, Bangkok",
			latitude: 13.736,
			longitude: 100.584,
		},
		contact: {
			name: "Kanya Wong",
			phone: "0956789012",
			profileImage: "http://localhost:3000/uploads/owners/owner5.jpg",
		},
		reserveCoins: 8,
	},
	{
		id: 6,
		uniqueCode: "PP-B2406",
		media: {
			cover: "http://localhost:3000/uploads/business/six/sixCover.jpg",
			photos: ["http://localhost:3000/uploads/business/six/sixGallery1.jpg"],
			videos: ["http://localhost:3000/uploads/business/six/sixVideo.mp4"],
		},
		type: "EVENT_VENUE",
		title: "Event Hall at Ratchada",
		pricing: { type: "DAILY", amount: 20000, deposit: 40000 },
		areaSqm: 150,
		capacity: 100,
		minLeaseMonths: 0,
		amenities: { WiFi: true, "A/C": true, Stage: true, Parking: true },
		about:
			"Spacious event hall ideal for conferences, parties, and exhibitions.",
		location: {
			address: "Ratchadapisek, Bangkok",
			latitude: 13.767,
			longitude: 100.569,
		},
		contact: {
			name: "Arthit Chai",
			phone: "0967890123",
			profileImage: "http://localhost:3000/uploads/owners/owner6.jpg",
		},
		reserveCoins: 10,
	},
];
