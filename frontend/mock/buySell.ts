export type PropertyType = "CONDO" | "HOUSE" | "TOWNHOUSE" | "PENTHOUSE";

export interface PropertyMedia {
	cover: string; // single main image
	images: string[]; // gallery images
	videos: string[]; // video URLs
}

export interface PropertyFeatures {
	[key: string]: boolean | undefined;
}

export interface PropertyLocation {
	address: string;
	latitude: number;
	longitude: number;
}

export interface PropertyAgent {
	name: string;
	experienceYears: number;
	rating: number;
	reviewCount: number;
	consultationFee: number;
	image?: string;
}

export interface Property {
	id: number;

	// Media (updated structure)
	media: PropertyMedia;

	// Pricing
	price: number;

	// Classification (updated)
	type: PropertyType;
	isNew: boolean;

	// Basic Info
	title: string;

	// Specs
	bedrooms: number;
	bathrooms: number;
	areaSqm: number;
	floor: number;
	totalFloors: number;

	// Features & Description
	features: PropertyFeatures;
	description: string;

	// Geo
	location: PropertyLocation;

	// Agent
	agent: PropertyAgent;

	// App logic
	reserveCoins: number;
}

export const MOCK_BUYSELL: Property[] = [
	{
		id: 1,
		media: {
			cover: "http://localhost:3000/uploads/buySell/one/oneCover.jpg",
			images: ["http://localhost:3000/uploads/buySell/one/oneGallery1.jpg"],
			videos: ["http://localhost:3000/uploads/buySell/one/oneVideo.mp4"],
		},
		price: 8500000,
		type: "CONDO",
		isNew: true,
		title: "Luxury Condo at Sukhumvit 24",
		bedrooms: 2,
		bathrooms: 2,
		areaSqm: 65,
		floor: 22,
		totalFloors: 35,
		features: {
			pool: true,
			gym: true,
			btsNearby: true,
			security24hr: true,
			parking: true,
		},
		description:
			"Modern luxury condo with stunning city views, steps from BTS Phrom Phong. Fully furnished with premium finishes.",
		location: {
			address: "Sukhumvit 24, Phrom Phong",
			latitude: 13.73,
			longitude: 100.567,
		},
		agent: {
			name: "Aye Thandar",
			experienceYears: 6,
			rating: 4.8,
			reviewCount: 95,
			consultationFee: 0,
			image: "https://images.unsplash.com/photo-1502764613149-7f1d229e230f",
		},
		reserveCoins: 10,
	},
	{
		id: 2,
		media: {
			cover: "http://localhost:3000/uploads/buySell/two/twoCover.jpg",
			images: ["http://localhost:3000/uploads/buySell/two/twoGallery1.jpg"],
			videos: ["http://localhost:3000/uploads/buySell/two/twoVideo.mp4"],
		},
		price: 12500000,
		type: "HOUSE",
		isNew: false,
		title: "Modern Family House",

		bedrooms: 4,
		bathrooms: 3,
		areaSqm: 180,
		floor: 2,
		totalFloors: 2,
		features: {
			pool: true,
			gym: false,
			btsNearby: false,
			security24hr: true,
			parking: true,
		},
		description:
			"Spacious family home with private pool, garage, and modern amenities. Great for families looking for comfort and security.",
		location: {
			address: "Bangkok, Sukhumvit 50",
			latitude: 13.71,
			longitude: 100.59,
		},
		agent: {
			name: "Ko Min",
			experienceYears: 8,
			rating: 4.6,
			reviewCount: 80,
			consultationFee: 5000,
			image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12",
		},
		reserveCoins: 15,
	},
	{
		id: 3,
		media: {
			cover: "http://localhost:3000/uploads/buySell/three/threeCover.jpg",
			images: ["http://localhost:3000/uploads/buySell/three/threeGallery1.jpg"],
			videos: ["http://localhost:3000/uploads/buySell/three/threeVideo.mp4"],
		},
		price: 9500000,
		type: "TOWNHOUSE",
		isNew: true,
		title: "Cozy Townhouse Near BTS",
		bedrooms: 3,
		bathrooms: 2,
		areaSqm: 120,
		floor: 3,
		totalFloors: 3,
		features: {
			pool: false,
			gym: false,
			btsNearby: true,
			security24hr: true,
			parking: true,
		},
		description:
			"Comfortable townhouse with modern interior, near public transport and shopping areas. Ideal for small families.",
		location: {
			address: "Bangkok, Ekkamai",
			latitude: 13.731,
			longitude: 100.58,
		},
		agent: {
			name: "U Kyaw Zin",
			experienceYears: 5,
			rating: 4.9,
			reviewCount: 50,
			consultationFee: 0,
			image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12",
		},
		reserveCoins: 8,
	},
	// {
	// 	id: 4,
	// 	media: {
	// 		cover: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
	// 		images: [
	// 			"https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
	// 			"https://images.unsplash.com/photo-1599423300746-b62533397364",
	// 		],
	// 		videos: [],
	// 	},
	// 	price: 20000000,
	// 	type: "PENTHOUSE",
	// 	isNew: true,
	// 	title: "Skyline Penthouse",
	// 	locationText: "Bangkok, Silom",
	// 	bedrooms: 5,
	// 	bathrooms: 4,
	// 	areaSqm: 250,
	// 	floor: 50,
	// 	totalFloors: 50,
	// 	features: {
	// 		pool: true,
	// 		gym: true,
	// 		btsNearby: false,
	// 		security24hr: true,
	// 		parking: true,
	// 	},
	// 	description:
	// 		"Luxury penthouse with panoramic city views, private terrace, and premium amenities. Perfect for executives and investors.",
	// 	location: { latitude: 13.727, longitude: 100.534 },
	// 	agent: {
	// 		name: "Aye Thandar",
	// 		experienceYears: 6,
	// 		rating: 4.8,
	// 		reviewCount: 95,
	// 		consultationFee: 0,
	// 		image: "https://images.unsplash.com/photo-1502764613149-7f1d229e230f",
	// 	},
	// 	reserveCoins: 20,
	// },
	// {
	// 	id: 5,
	// 	media: {
	// 		cover: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914",
	// 		images: [
	// 			"https://images.unsplash.com/photo-1580587771525-78b9dba3b914",
	// 			"https://images.unsplash.com/photo-1572120360610-d971b9c8f3e3",
	// 		],
	// 		videos: [],
	// 	},
	// 	price: 6800000,
	// 	type: "CONDO",
	// 	isNew: false,
	// 	title: "Budget Condo in Central Bangkok",
	// 	locationText: "Bangkok, Phayathai",
	// 	bedrooms: 1,
	// 	bathrooms: 1,
	// 	areaSqm: 45,
	// 	floor: 8,
	// 	totalFloors: 20,
	// 	features: {
	// 		pool: false,
	// 		gym: true,
	// 		btsNearby: true,
	// 		security24hr: true,
	// 		parking: false,
	// 	},
	// 	description:
	// 		"Affordable condo for singles or young couples. Conveniently located near BTS stations and shopping.",
	// 	location: { latitude: 13.756, longitude: 100.538 },
	// 	agent: {
	// 		name: "Ko Min",
	// 		experienceYears: 8,
	// 		rating: 4.6,
	// 		reviewCount: 80,
	// 		consultationFee: 0,
	// 		image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12",
	// 	},
	// 	reserveCoins: 5,
	// },
];
