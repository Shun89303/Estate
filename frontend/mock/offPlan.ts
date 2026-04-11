import { API_BASE_URL } from "@/config/api";

export type UnitStatus = "Available" | "Reserved" | "Sold";

export interface UnitType {
	type: "Studio" | "1 Bed" | "2 Bed" | "Duplex";
	status: UnitStatus;
	floor: string; // e.g., "8th", "15th"
	areaSqm: number; // e.g., 28
	bedrooms?: number; // Studio has 0 or undefined
	bathrooms: number; // e.g., 1
	priceTotal: number; // e.g., 3500000
	pricePerSqm: number; // e.g., 125000
}

export interface PaymentStep {
	name: string; // e.g., "Booking Deposit"
	percentage: number; // 5, 15, etc.
	amount?: number; // calculated if unit selected
}

export interface PaymentPlan {
	steps: PaymentStep[];
	calculateAmounts: (unitPrice: number) => PaymentStep[];
}

export interface Tracks {
	projectsCount: number;
	yearsCount: number;
	isSet: boolean;
}

export interface Developer {
	name: string; // e.g., "Origin Property"
	image: string;
	bio: string;
	establishedYear: number; // e.g., 2009
	projectsCompleted: number; // e.g., 85
	trackRecord?: Tracks; // optional extra text
	buyerProtection: string[]; // e.g., ["Escrow Account Protected", ...]
}

export interface ProjectFeatures {
	infinityPool?: boolean;
	coworking?: boolean;
	gym?: boolean;
	garden?: boolean;
	evCharging?: boolean;
	smartHome?: boolean;
	[key: string]: boolean | undefined;
}

export interface OffPlanProperty {
	id: number;
	uniqueCode: string;

	// Media
	media: {
		cover: string;
		images: string[];
		videos: string[];
	};

	// Highlights
	title: string; // "The Horizon Sukhumvit 48"
	developerName: string; // "Origin Property Est 2009"
	rentalYield: string; // "5.2%"
	annualGrowth: string; // "8.5%"
	unitsLeft: number; // e.g., 180
	priceRange: string; // "฿3.5M--฿12M"
	completionDate: string; // e.g., "Q4 2028"
	locationAddress: string; // "Sukhumvit 48, Phra Khanong"
	longitude: number;
	latitude: number;

	// Units
	units: UnitType[];

	// Payment
	paymentPlan: PaymentPlan;

	// Developer / Trust
	developer: Developer;

	// Project features
	features: ProjectFeatures;

	// About & Nearby
	about: string;
	nearbyLandmarks: string[]; // ["BTS Phra Khanong", "Gateway Ekkamai", ...]
}

export const MOCK_OFFPLAN: OffPlanProperty[] = [
	{
		id: 1,
		uniqueCode: "PP-O2401",

		media: {
			cover: `${API_BASE_URL}/uploads/offPlan/one/oneCover.jpg`,
			images: [`${API_BASE_URL}/uploads/offPlan/one/oneGallery1.jpg`],
			videos: [`${API_BASE_URL}/uploads/offPlan/one/oneVideo.mp4`],
		},

		title: "The Horizon Sukhumvit 48",
		developerName: "Origin Property Est 2009",
		rentalYield: "5.2%",
		annualGrowth: "8.5%",
		unitsLeft: 180,
		priceRange: "฿3.5M--฿12M",
		completionDate: "Q4 2028",
		locationAddress: "Sukhumvit 48, Phra Khanong",
		longitude: 100.5697,
		latitude: 13.71,

		units: [
			{
				type: "Studio",
				status: "Available",
				floor: "8th",
				areaSqm: 28,
				bathrooms: 1,
				priceTotal: 3500000,
				pricePerSqm: 125000,
			},
			{
				type: "1 Bed",
				status: "Reserved",
				floor: "10th",
				areaSqm: 35,
				bedrooms: 1,
				bathrooms: 1,
				priceTotal: 4500000,
				pricePerSqm: 128500,
			},
			{
				type: "2 Bed",
				status: "Sold",
				floor: "15th",
				areaSqm: 60,
				bedrooms: 2,
				bathrooms: 2,
				priceTotal: 8500000,
				pricePerSqm: 141666,
			},
		],

		paymentPlan: {
			steps: [
				{ name: "Booking Deposit", percentage: 5 },
				{ name: "Contract Signing", percentage: 15 },
				{ name: "Foundation Complete", percentage: 10 },
				{ name: "Structure Complete", percentage: 20 },
				{ name: "Handover", percentage: 50 },
			],
			calculateAmounts: function (unitPrice: number) {
				return this.steps.map((step) => ({
					...step,
					amount: Math.round((unitPrice * step.percentage) / 100),
				}));
			},
		},

		developer: {
			name: "Origin Property",
			image: `${API_BASE_URL}/uploads/offPlan/one/oneDev.jpg`,
			bio: "Origin Property is a leading Thai developer listed on the Stock Exchange of Thailand, known for quality condominiums near BTS/MRT stations",
			establishedYear: 2009,
			projectsCompleted: 85,
			buyerProtection: [
				"Escrow Account Protected",
				"SET-Listed Developer",
				"5-Year Structural Warranty",
				"Money-Back Guarantee if Delayed 12+ Months",
			],
			trackRecord: {
				projectsCount: 85,
				yearsCount: 40,
				isSet: true,
			},
		},

		features: {
			infinityPool: true,
			coworking: true,
			gym: true,
			garden: true,
			evCharging: true,
			smartHome: true,
		},

		about:
			"Premium mixed-use development by Origin Property. 800m from BTS Phra Khanong. Rooftop infinity pool and co-working space.",

		nearbyLandmarks: [
			"BTS Phra Khanong",
			"Gateway Ekkamai",
			"Sukhumvit Hospital",
		],
	},

	{
		id: 2,
		uniqueCode: "PP-O2402",

		media: {
			cover: `${API_BASE_URL}/uploads/offPlan/two/twoCover.jpg`,
			images: [`${API_BASE_URL}/uploads/offPlan/two/twoGallery1.jpg`],
			videos: [`${API_BASE_URL}/uploads/offPlan/two/twoVideo.mp4`],
		},

		title: "Skyline Residences Rama 9",
		developerName: "Sansiri Est 1984",
		rentalYield: "4.8%",
		annualGrowth: "7.2%",
		unitsLeft: 95,
		priceRange: "฿4M--฿15M",
		completionDate: "Q2 2027",
		locationAddress: "Rama 9 Road, Huai Khwang",
		longitude: 100.5663,
		latitude: 13.756,

		units: [
			{
				type: "Studio",
				status: "Available",
				floor: "12th",
				areaSqm: 30,
				bathrooms: 1,
				priceTotal: 4000000,
				pricePerSqm: 133333,
			},
			{
				type: "1 Bed",
				status: "Available",
				floor: "18th",
				areaSqm: 40,
				bedrooms: 1,
				bathrooms: 1,
				priceTotal: 5500000,
				pricePerSqm: 137500,
			},
			{
				type: "Duplex",
				status: "Reserved",
				floor: "25th",
				areaSqm: 75,
				bedrooms: 2,
				bathrooms: 2,
				priceTotal: 12000000,
				pricePerSqm: 160000,
			},
		],

		paymentPlan: {
			steps: [
				{ name: "Booking Deposit", percentage: 5 },
				{ name: "Contract Signing", percentage: 15 },
				{ name: "Foundation Complete", percentage: 10 },
				{ name: "Structure Complete", percentage: 20 },
				{ name: "Handover", percentage: 50 },
			],
			calculateAmounts: function (unitPrice: number) {
				return this.steps.map((step) => ({
					...step,
					amount: Math.round((unitPrice * step.percentage) / 100),
				}));
			},
		},

		developer: {
			name: "Sansiri",
			image: `${API_BASE_URL}/uploads/offPlan/two/twoDev.jpg`,
			bio: "Sansiri is one of Thailand’s most established real estate developers, known for high-quality residential projects and strong design standards across Bangkok and major cities.",
			establishedYear: 1984,
			projectsCompleted: 120,
			buyerProtection: [
				"Escrow Account Protected",
				"SET-Listed Developer",
				"5-Year Structural Warranty",
			],
			trackRecord: {
				projectsCount: 120,
				yearsCount: 30,
				isSet: true,
			},
		},

		features: {
			infinityPool: true,
			gym: true,
			garden: true,
			smartHome: true,
		},

		about:
			"Luxury high-rise condominium in Rama 9 CBD. Walking distance to MRT and shopping malls.",

		nearbyLandmarks: ["MRT Rama 9", "Central Rama 9", "Fortune Town"],
	},
	{
		id: 3,
		uniqueCode: "PP-O2403",

		media: {
			cover: `${API_BASE_URL}/uploads/offPlan/three/threeCover.jpg`,
			images: [`${API_BASE_URL}/uploads/offPlan/three/threeGallery1.jpg`],
			videos: [`${API_BASE_URL}/uploads/offPlan/three/threeVideo.mp4`],
		},

		title: "Green Valley Bangna",
		developerName: "AP Thailand Est 1991",
		rentalYield: "5.5%",
		annualGrowth: "6.8%",
		unitsLeft: 210,
		priceRange: "฿2.8M--฿9M",
		completionDate: "Q1 2029",
		locationAddress: "Bangna-Trad Road, Bangna",
		longitude: 100.609,
		latitude: 13.6685,

		units: [
			{
				type: "Studio",
				status: "Available",
				floor: "5th",
				areaSqm: 26,
				bathrooms: 1,
				priceTotal: 2800000,
				pricePerSqm: 107692,
			},
			{
				type: "1 Bed",
				status: "Available",
				floor: "9th",
				areaSqm: 34,
				bedrooms: 1,
				bathrooms: 1,
				priceTotal: 3900000,
				pricePerSqm: 114705,
			},
			{
				type: "2 Bed",
				status: "Reserved",
				floor: "14th",
				areaSqm: 55,
				bedrooms: 2,
				bathrooms: 2,
				priceTotal: 7200000,
				pricePerSqm: 130909,
			},
		],

		paymentPlan: {
			steps: [
				{ name: "Booking Deposit", percentage: 5 },
				{ name: "Contract Signing", percentage: 15 },
				{ name: "Foundation Complete", percentage: 10 },
				{ name: "Structure Complete", percentage: 20 },
				{ name: "Handover", percentage: 50 },
			],
			calculateAmounts: function (unitPrice: number) {
				return this.steps.map((step) => ({
					...step,
					amount: Math.round((unitPrice * step.percentage) / 100),
				}));
			},
		},

		developer: {
			name: "AP Thailand",
			image: `${API_BASE_URL}/uploads/offPlan/three/threeDev.jpg`,
			bio: "AP Thailand is a major property developer focused on urban living solutions, delivering a wide range of residential projects with strong emphasis on accessibility and modern lifestyle.",
			establishedYear: 1991,
			projectsCompleted: 150,
			buyerProtection: [
				"Escrow Account Protected",
				"SET-Listed Developer",
				"Money-Back Guarantee if Delayed 12+ Months",
			],
			trackRecord: {
				projectsCount: 150,
				yearsCount: 36,
				isSet: true,
			},
		},

		features: {
			infinityPool: true,
			coworking: true,
			gym: true,
			evCharging: true,
		},

		about:
			"Affordable modern condominium in Bangna area. Close to Mega Bangna and expressway access.",

		nearbyLandmarks: ["Mega Bangna", "Bangkok Mall", "Suvarnabhumi Airport"],
	},
];
