import { API_BASE_URL } from "@/config/api";

export type BusinessType =
	| "Restaurant"
	| "Cafe"
	| "Hotel"
	| "Spa/Massage"
	| "Retail"
	| "Franchise";

export interface OwnerContact {
	name: string;
	profileImage: string; // URL or local path
	phone: string;
}

export interface GeoLocation {
	longitude: number;
	latitude: number;
}

export interface PropertyHighlights {
	[key: string]: boolean | undefined;
}

export interface PropertyIncludedInSale {
	[key: string]: boolean | undefined;
}

export interface BuyBusiness {
	// Basic info
	id: number;
	type: BusinessType;
	coverImage: string; // main image URL
	images: string[]; // array of image URLs
	videos?: string[]; // optional array of video URLs
	uniqueCode: string; // unique identifier for the listing
	title: string;
	location: string; // human-readable address
	price: number; // sale price in currency (e.g., MMK or THB)

	// Business details
	staffs: number; // number of staff
	years: number; // years in operation
	area: number; // floor area (sqm or other unit)
	monthlyRevenue: number;
	monthlyProfit: number;
	roiEst: number; // estimated ROI as percentage (e.g., 15.5)

	// Text blocks
	highlights: PropertyHighlights; // e.g., ["Franchise model", "Mall location"]
	includedInSale: PropertyIncludedInSale; // e.g., ["Franchise rights", "Equipment"]
	aboutThisBusiness: string; // detailed description

	// Location coordinates
	geoLocation: GeoLocation;

	// Contact
	businessContact: OwnerContact;

	// Coin system
	reserveCoins: number; // coins required to reserve/view contact
	unlockCoins: number;
}

export const MOCK_BUY_BUSINESS: BuyBusiness[] = [
	{
		id: 1,
		uniqueCode: "REST-2025-001",
		type: "Restaurant",
		coverImage: `${API_BASE_URL}/uploads/buyBusiness/restaurant/restaurantCover.jpg`,
		images: [
			`${API_BASE_URL}/uploads/buyBusiness/restaurant/restaurant1.jpg`,
			`${API_BASE_URL}/uploads/buyBusiness/restaurant/restaurant2.jpg`,
			`${API_BASE_URL}/uploads/buyBusiness/restaurant/restaurant3.jpg`,
		],
		videos: [
			`${API_BASE_URL}/uploads/buyBusiness/restaurant/restaurantVideo.mp4`,
		],
		title: "Authentic Italian Ristorante - Prime Sukhumvit Location",
		location: "Sukhumvit Soi 11, Bangkok, Thailand",
		price: 4500000,
		staffs: 12,
		years: 5,
		area: 180,
		monthlyRevenue: 850000,
		monthlyProfit: 210000,
		roiEst: 28.5,
		highlights: {
			"Fully equipped kitchen": true,
			"Alcohol license": true,
			"BTS within 3 min walk": true,
			"Established 5 years": true,
			"Loyal customer base": true,
			"Seating capacity 65 pax": true,
			"Parking available": false,
			"Outdoor seating": true,
		},
		includedInSale: {
			"All kitchen equipment & furniture": true,
			"POS system with sales data": true,
			"Existing supplier contracts": true,
			"Lease agreement (8 years remaining)": true,
			"Website & social media accounts": true,
			"Trademark 'La Trattoria'": true,
			"Staff training manuals": true,
			"Inventory (food & beverage)": false,
		},
		aboutThisBusiness:
			"Authentic Italian restaurant operating for 5 years in the heart of Sukhumvit. Known for wood-fired pizzas and handmade pasta. Consistently 4.8 stars on Google Maps. High repeat customer rate. Turnkey operation with trained staff willing to stay. Great opportunity for a hands-on owner or investor.",
		geoLocation: {
			longitude: 100.5608,
			latitude: 13.7365,
		},
		businessContact: {
			name: "Marco Rossi",
			profileImage: `${API_BASE_URL}/uploads/owners/owner8.jpg`,
			phone: "+66891234567",
		},
		reserveCoins: 50,
		unlockCoins: 5,
	},
	{
		id: 2,
		uniqueCode: "CAFE-2025-002",
		type: "Cafe",
		coverImage: `${API_BASE_URL}/uploads/buyBusiness/cafe/cafeCover.jpg`,
		images: [
			`${API_BASE_URL}/uploads/buyBusiness/cafe/cafe1.jpg`,
			`${API_BASE_URL}/uploads/buyBusiness/cafe/cafe2.jpg`,
			`${API_BASE_URL}/uploads/buyBusiness/cafe/cafe3.jpg`,
		],
		videos: [`${API_BASE_URL}/uploads/buyBusiness/cafe/cafeVideo.mp4`],
		title: "Artisan Coffee & Brunch - Nimmanhaemin",
		location: "Nimmanhaemin Soi 5, Chiang Mai, Thailand",
		price: 2200000,
		staffs: 6,
		years: 3,
		area: 95,
		monthlyRevenue: 320000,
		monthlyProfit: 85000,
		roiEst: 46.4,
		highlights: {
			"Specialty coffee roaster on-site": true,
			"Instagrammable interior": true,
			"High foot traffic area": true,
			"Fully equipped kitchen": true,
			"Loyal customer base": true,
			"Seating capacity 40 pax": true,
			"Parking available": false,
			"Outdoor seating": true,
		},
		includedInSale: {
			"La Marzocco espresso machine": true,
			"Furniture & decor": true,
			"Existing supplier contracts": true,
			"Lease agreement (5 years remaining)": true,
			"Social media accounts (15k followers)": true,
			"Point of sale system": true,
			"Staff training manuals": true,
			"Inventory (coffee beans, pastries)": false,
		},
		aboutThisBusiness:
			"Trendy specialty coffee shop in Chiang Mai's Nimmanhaemin district. Known for single-origin pour-overs and artisanal brunch. Consistently rated 4.7 stars on Google Maps. High tourist and digital nomad traffic. Turnkey operation with trained baristas willing to stay.",
		geoLocation: {
			longitude: 98.9716,
			latitude: 18.8021,
		},
		businessContact: {
			name: "Kittipat S.",
			profileImage: `${API_BASE_URL}/uploads/owners/owner3.jpg`,
			phone: "+66987654321",
		},
		reserveCoins: 30,
		unlockCoins: 5,
	},
	{
		id: 3,
		uniqueCode: "HOTEL-2025-003",
		type: "Hotel",
		coverImage: `${API_BASE_URL}/uploads/buyBusiness/hotel/hotelCover.jpg`,
		images: [
			`${API_BASE_URL}/uploads/buyBusiness/hotel/hotel1.jpg`,
			`${API_BASE_URL}/uploads/buyBusiness/hotel/hotel2.jpg`,
			`${API_BASE_URL}/uploads/buyBusiness/hotel/hotel3.jpg`,
		],
		videos: [`${API_BASE_URL}/uploads/buyBusiness/hotel/hotelVideo.mp4`],
		title: "Boutique Hotel - Walking Street, Pattaya",
		location: "Walking Street, Pattaya, Thailand",
		price: 12500000,
		staffs: 18,
		years: 8,
		area: 450,
		monthlyRevenue: 1650000,
		monthlyProfit: 420000,
		roiEst: 40.3,
		highlights: {
			"Prime location on Walking Street": true,
			"25 rooms (including 5 suites)": true,
			"Rooftop pool & bar": true,
			"Full restaurant license": true,
			"High occupancy rate (85%+)": true,
			"Established 8 years": true,
			"Parking for 10 cars": true,
			"On-site laundry": true,
		},
		includedInSale: {
			"All furniture & fixtures": true,
			"Booking.com/Agoda accounts (4.5 stars)": true,
			"Existing supplier contracts": true,
			"Lease agreement (12 years remaining)": true,
			"Website & social media accounts": true,
			"Hotel management software": true,
			"Staff training manuals": true,
			"Vehicle (tourist van)": true,
		},
		aboutThisBusiness:
			"Well-established boutique hotel on Pattaya's famous Walking Street. Caters to both tourists and business travelers. High season occupancy exceeds 95%. Consistent positive reviews on major booking platforms. Turnkey operation with experienced manager willing to stay.",
		geoLocation: {
			longitude: 100.8817,
			latitude: 12.9283,
		},
		businessContact: {
			name: "Somchai T.",
			profileImage: `${API_BASE_URL}/uploads/owners/owner7.jpg`,
			phone: "+66881234567",
		},
		reserveCoins: 150,
		unlockCoins: 5,
	},
	{
		id: 4,
		uniqueCode: "SPA-2025-004",
		type: "Spa/Massage",
		coverImage: `${API_BASE_URL}/uploads/buyBusiness/spa/spaCover.jpg`,
		images: [
			`${API_BASE_URL}/uploads/buyBusiness/spa/spa1.jpg`,
			`${API_BASE_URL}/uploads/buyBusiness/spa/spa2.jpg`,
			`${API_BASE_URL}/uploads/buyBusiness/spa/spa3.jpg`,
		],
		videos: [`${API_BASE_URL}/uploads/buyBusiness/spa/spaVideo.mp4`],
		title: "Traditional Thai Massage & Spa - Sukhumvit 24",
		location: "Sukhumvit Soi 24, Bangkok, Thailand",
		price: 3800000,
		staffs: 10,
		years: 6,
		area: 210,
		monthlyRevenue: 560000,
		monthlyProfit: 145000,
		roiEst: 45.8,
		highlights: {
			"Prime location near BTS Phrom Phong": true,
			"8 treatment rooms": true,
			"Herbal steam room": true,
			"Fully licensed & certified therapists": true,
			"Established 6 years": true,
			"High repeat customers (70%)": true,
			"Online booking system": true,
			"Parking available": false,
		},
		includedInSale: {
			"All massage beds & equipment": true,
			"Herbal compress supplies": true,
			"POS & booking system": true,
			"Existing client database (5k+)": true,
			"Google Maps 4.9 stars": true,
			"Lease agreement (5 years remaining)": true,
			"Staff training manuals": true,
			"Spa uniforms & linens": true,
		},
		aboutThisBusiness:
			"Authentic Thai massage and spa located in upscale Sukhumvit area. Known for high-quality traditional massages and aromatherapy. Serves both tourists and local expats. Fully staffed with certified therapists. Turnkey operation with strong online reputation.",
		geoLocation: {
			longitude: 100.5698,
			latitude: 13.7264,
		},
		businessContact: {
			name: "Nattaya P.",
			profileImage: `${API_BASE_URL}/uploads/owners/owner6.jpg`,
			phone: "+66991234567",
		},
		reserveCoins: 50,
		unlockCoins: 5,
	},
	{
		id: 5,
		uniqueCode: "RETAIL-2025-005",
		type: "Retail",
		coverImage: `${API_BASE_URL}/uploads/buyBusiness/retail/retailCover.jpg`,
		images: [
			`${API_BASE_URL}/uploads/buyBusiness/retail/retail1.jpg`,
			`${API_BASE_URL}/uploads/buyBusiness/retail/retail2.jpg`,
			`${API_BASE_URL}/uploads/buyBusiness/retail/retail3.jpg`,
		],
		videos: [`${API_BASE_URL}/uploads/buyBusiness/retail/retailVideo.mp4`],
		title: "Fashion Boutique - CentralWorld Mall",
		location: "CentralWorld, Bangkok, Thailand",
		price: 5900000,
		staffs: 8,
		years: 4,
		area: 85,
		monthlyRevenue: 720000,
		monthlyProfit: 185000,
		roiEst: 37.6,
		highlights: {
			"Prime mall location (Zone A)": true,
			"High foot traffic daily": true,
			"Established brand 'Urban Chic'": true,
			"Loyal customer program": true,
			"E-commerce website active": true,
			"Instagram 50k followers": true,
			"Fully fitted interior": true,
			"Parking included": true,
		},
		includedInSale: {
			"All fixtures & mannequins": true,
			"POS system with sales data": true,
			"Existing supplier contracts": true,
			"Lease agreement (3 years remaining)": true,
			"Website & social media accounts": true,
			"Inventory (clothing, accessories)": true,
			"Email list (10k subscribers)": true,
			"Security system": true,
		},
		aboutThisBusiness:
			"Trendy fashion boutique in CentralWorld mall. Specializes in contemporary Thai designer wear and accessories. Strong online presence with growing e-commerce sales. High foot traffic location on the first floor. Turnkey operation with trained sales staff.",
		geoLocation: {
			longitude: 100.5406,
			latitude: 13.7467,
		},
		businessContact: {
			name: "Pimchanok L.",
			profileImage: `${API_BASE_URL}/uploads/owners/owner5.jpg`,
			phone: "+66861122334",
		},
		reserveCoins: 70,
		unlockCoins: 5,
	},
	{
		id: 6,
		uniqueCode: "FRAN-2025-006",
		type: "Franchise",
		coverImage: `${API_BASE_URL}/uploads/buyBusiness/franchise/franchiseCover.jpg`,
		images: [
			`${API_BASE_URL}/uploads/buyBusiness/franchise/franchise1.jpg`,
			`${API_BASE_URL}/uploads/buyBusiness/franchise/franchise2.jpg`,
			`${API_BASE_URL}/uploads/buyBusiness/franchise/franchise3.jpg`,
		],
		videos: [
			`${API_BASE_URL}/uploads/buyBusiness/franchise/franchiseVideo.mp4`,
		],
		title: "Bubble Tea Franchise - Siam Square",
		location: "Siam Square Soi 2, Bangkok, Thailand",
		price: 2800000,
		staffs: 6,
		years: 2,
		area: 45,
		monthlyRevenue: 480000,
		monthlyProfit: 115000,
		roiEst: 49.3,
		highlights: {
			"Established franchise brand 'TeaMee'": true,
			"Prime Siam Square location": true,
			"High tourist and student traffic": true,
			"Franchisor training & support": true,
			"Proven business model": true,
			"Social media marketing included": true,
			"Low operating costs": true,
			"Seating capacity 20 pax": true,
		},
		includedInSale: {
			"Franchise rights (transferable)": true,
			"All equipment (machines, fridge)": true,
			"POS system": true,
			"Initial supplies & ingredients": true,
			"Training program (2 weeks)": true,
			"Lease agreement (5 years remaining)": true,
			"Franchisor marketing materials": true,
			"Brand merchandise": true,
		},
		aboutThisBusiness:
			"Popular bubble tea franchise located in Siam Square, one of Bangkok's busiest shopping districts. Low startup cost with strong franchisor support. Proven business model with high profit margins. Ideal for first-time entrepreneurs. Turnkey operation with minimal staffing requirements.",
		geoLocation: {
			longitude: 100.5324,
			latitude: 13.7457,
		},
		businessContact: {
			name: "Chalermchai K.",
			profileImage: `${API_BASE_URL}/uploads/owners/owner4.jpg`,
			phone: "+66898765432",
		},
		reserveCoins: 40,
		unlockCoins: 5,
	},
];
