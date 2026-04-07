export type ContentCategory =
	| "investment guide"
	| "how-to"
	| "legal"
	| "market insights"
	| "visa & immigration"
	| "property tour"
	| "stories";

export interface BaseContent {
	id: number;
	title: string;
	postedBy: string;
	authorProfileImage: string;
	date: string;
	likes: number;
	category: ContentCategory;
	saved: boolean;
	read: boolean;
	forYou: boolean;
}

export interface ArticleContent extends BaseContent {
	type: "article";
	imageUrl: string;
	content: string;
	keyTakeaways?: string[];
	readTimeMinutes: number;
	cta: {
		title: string;
		description: string;
		buttonText: string;
		buttonLink: string;
	};
}

export interface VideoContent extends BaseContent {
	type: "video";
	videoUrl: string;
	thumbnailUrl: string;
	content: string;
	cta: {
		title: string;
		description: string;
		buttonText: string;
		buttonLink: string;
	};
	relatedVideos: {
		id: number;
		title: string;
		thumbnailUrl: string;
		videoUrl: string;
	}[];
}

export type ContentItem = ArticleContent | VideoContent;

export const MOCK_CONTENTS: ContentItem[] = [
	{
		id: 1,
		type: "article",
		title: "Top 5 Areas to Buy Property in Bangkok",
		postedBy: "Somchai Property Expert",
		authorProfileImage: "http://localhost:3000/uploads/owners/owner6.jpg",
		date: "April 2, 2025",
		likes: 124,
		category: "investment guide",
		saved: true,
		read: true,
		forYou: true,
		imageUrl: "http://localhost:3000/uploads/contents/one/oneCover.jpg",
		content:
			"Discover the most popular neighborhoods for Myanmar investors looking to buy condos and houses in Bangkok. From the bustling Sukhumvit corridor to the serene riverside developments, we break down each area's investment potential, rental yields, and lifestyle benefits.\n\nThailand's property market continues to attract international buyers, especially from Myanmar. With competitive pricing, modern infrastructure, and excellent rental yields, investing in Thai real estate has become one of the smartest financial decisions for Myanmar nationals.",
		keyTakeaways: [
			"Foreign nationals can own condominium units outright (up to 49% of total units in a building)",
			"Leasehold arrangements available for houses and land (30-year renewable leases)",
			"Bangkok, Pattaya, and Chiang Mai are the top destinations for Myanmar buyers",
			"Our team of experienced agents can guide you through the entire process, from property selection to legal documentation and financing options.",
		],
		readTimeMinutes: 8,
		cta: {
			title: "FREE CONSULTATION",
			description:
				"Like what you see? Let's find yours.\nOur property experts are ready to help you find your dream home or investment. Zero obligation.",
			buttonText: "Talk to an Expert",
			buttonLink: "/",
		},
	},

	{
		id: 2,
		type: "article",
		title: "Understanding Thai Property Laws for Foreign Buyers",
		postedBy: "Legal Team @ ThaiRealEstate",
		authorProfileImage: "http://localhost:3000/uploads/owners/owner5.jpg",
		date: "March 20, 2025",
		likes: 89,
		category: "legal",
		saved: false,
		read: false,
		forYou: false,
		imageUrl: "http://localhost:3000/uploads/contents/two/twoCover.jpg",
		content:
			"Navigating property ownership laws in Thailand can be tricky for foreigners. This guide explains the legal framework, ownership structures, and key considerations before buying.\n\nForeigners cannot own land directly, but there are legal ways to acquire a house or land through leasehold structures or setting up a Thai company. Condominiums are easier: foreign ownership is allowed up to 49% of total unit area in a building.",
		keyTakeaways: [
			"Foreign ownership quota for condos is 49% of total unit space",
			"Leasehold agreements for land/houses can be registered for 30 years with renewal options",
			"Thai company ownership route requires actual business operations and Thai majority shareholders",
			"Always verify land title deeds (Chanote is safest)",
		],
		readTimeMinutes: 6,
		cta: {
			title: "Need Legal Clarity?",
			description:
				"Our legal partners specialize in foreign property transactions. Book a consultation to review your case.",
			buttonText: "Get Legal Advice",
			buttonLink: "/legal-consultation",
		},
	},

	{
		id: 3,
		type: "video",
		title: "Virtual Tour: Luxury Condo in Sukhumvit 39",
		postedBy: "Property Vision Team",
		authorProfileImage: "http://localhost:3000/uploads/owners/owner4.jpg",
		date: "March 28, 2025",
		likes: 267,
		category: "property tour",
		saved: true,
		read: true,
		forYou: true,
		videoUrl: "http://localhost:3000/uploads/contents/three/threeVideo.mp4",
		thumbnailUrl: "http://localhost:3000/uploads/contents/three/threeCover.jpg",
		content:
			"Walk through a fully furnished 2-bedroom condo with panoramic city views, pool, and gym. Learn about the building amenities and neighborhood highlights.",
		cta: {
			title: "Schedule a Viewing",
			description:
				"Interested in this property? Book a private tour with our agent.",
			buttonText: "Request Tour",
			buttonLink: "/contact",
		},
		relatedVideos: [
			{
				id: 4,
				title: "Sukhumvit Investment Overview 2025",
				thumbnailUrl: "https://picsum.photos/id/158/400/225",
				videoUrl: "https://example.com/videos/sukhumvit-invest.mp4",
			},
			{
				id: 5,
				title: "How to Buy a Condo in Thailand as a Foreigner",
				thumbnailUrl: "https://picsum.photos/id/159/400/225",
				videoUrl: "https://example.com/videos/buying-guide.mp4",
			},
		],
	},

	{
		id: 6,
		type: "video",
		title: "How to Get a Thai Elite Visa for Property Investors",
		postedBy: "Visa & Immigration Desk",
		authorProfileImage: "http://localhost:3000/uploads/owners/owner3.jpg",
		date: "March 15, 2025",
		likes: 143,
		category: "visa & immigration",
		saved: false,
		read: false,
		forYou: true,
		videoUrl: "http://localhost:3000/uploads/contents/four/fourVideo.mp4",
		thumbnailUrl: "http://localhost:3000/uploads/contents/four/fourCover.jpg",
		content:
			"Thai Elite Visa allows long-term stay (5-20 years) with multiple benefits. This video explains the application process, costs, and how it connects to property investment.",
		cta: {
			title: "Visa Consultation",
			description:
				"Need help with your Thai Elite Visa application? Talk to our experts.",
			buttonText: "Book Consultation",
			buttonLink: "/visa-consultation",
		},
		relatedVideos: [
			{
				id: 3,
				title: "Virtual Tour: Luxury Condo in Sukhumvit 39",
				thumbnailUrl: "https://picsum.photos/id/155/400/225",
				videoUrl: "https://example.com/videos/sukhumvit-tour.mp4",
			},
			{
				id: 7,
				title: "Retirement Visa vs Elite Visa: Which is Better?",
				thumbnailUrl: "https://picsum.photos/id/162/400/225",
				videoUrl: "https://example.com/videos/visa-comparison.mp4",
			},
		],
	},

	// New video entry (id: 7)
	{
		id: 7,
		type: "video",
		title: "How to Transfer Money from Myanmar to Thailand",
		postedBy: "Financial Desk",
		authorProfileImage: "http://localhost:3000/uploads/owners/owner2.jpg",
		date: "April 5, 2025",
		likes: 98,
		category: "how-to",
		saved: false,
		read: false,
		forYou: true,
		videoUrl: "http://localhost:3000/uploads/contents/five/fiveVideo.mp4",
		thumbnailUrl: "http://localhost:3000/uploads/contents/five/fiveCover.jpg",
		content:
			"Step-by-step guide covering bank wire transfers, official exchange channels, and compliance requirements. Learn about transfer limits, fees, and how to document your funds for property purchases in Thailand.\n\nWatch this comprehensive guide to understand the process of buying property in Thailand as a Myanmar national. Our experts cover everything from initial search to final ownership transfer.",
		cta: {
			title: "Need Financial Guidance?",
			description:
				"Our team can help you navigate international transfers and compliance. Free initial consultation.",
			buttonText: "Talk to an Expert",
			buttonLink: "/financial-consultation",
		},
		relatedVideos: [
			{
				id: 3,
				title: "Virtual Tour: Luxury Condo in Sukhumvit 39",
				thumbnailUrl:
					"http://localhost:3000/uploads/contents/three/threeCover.jpg", // actual thumbnail from id 3
				videoUrl: "http://localhost:3000/uploads/contents/three/threeVideo.mp4",
			},
			{
				id: 6,
				title: "How to Get a Thai Elite Visa for Property Investors",
				thumbnailUrl:
					"http://localhost:3000/uploads/contents/four/fourCover.jpg", // actual thumbnail from id 6
				videoUrl: "http://localhost:3000/uploads/contents/four/fourVideo.mp4",
			},
		],
	},
];
