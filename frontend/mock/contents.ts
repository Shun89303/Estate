export interface Content {
	id: string;
	type: "article" | "video";
	title: string;
	media: string;
	thumbnail?: string;
	category:
		| "INVESTMENT GUIDE"
		| "HOW-TO"
		| "LEGAL"
		| "MARKET INSIGHTS"
		| "VISA & IMMIGRATION"
		| "PROPERTY TOUR"
		| "STORIES";
	posted_by: string;
	date: string; // formatted string for UI
	read_time?: string; // optional (e.g. "6 min read")
}

export const MOCK_CONTENTS: Content[] = [
	{
		id: "1",
		type: "article",
		title: "Top 5 Areas to Buy Property in Bangkok",
		media: "https://images.unsplash.com/photo-1599423300746-b62533397364",
		category: "INVESTMENT GUIDE",
		posted_by: "Pandora Team",
		date: "Mar 20, 2026",
		read_time: "6 min read",
	},
	{
		id: "2",
		type: "video",
		title: "Luxury Apartment Tour in Chiang Mai",
		media:
			"https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
		thumbnail: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
		category: "PROPERTY TOUR",
		posted_by: "Ko Zaw",
		date: "Mar 28, 2026",
	},
	{
		id: "3",
		type: "article",
		title: "How Foreigners Can Buy Property in Thailand",
		media: "https://images.unsplash.com/photo-1582407947304-fd86f028f716",
		category: "HOW-TO",
		posted_by: "Legal Team",
		date: "Mar 18, 2026",
		read_time: "8 min read",
	},
	{
		id: "4",
		type: "video",
		title: "Condo Investment Tips for Expats",
		media:
			"https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
		thumbnail: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914",
		category: "INVESTMENT GUIDE",
		posted_by: "John Smith",
		date: "Mar 25, 2026",
	},
	{
		id: "5",
		type: "article",
		title: "Understanding Property Laws in Myanmar",
		media: "https://images.unsplash.com/photo-1528744598421-b7b93e12df55",
		category: "LEGAL",
		posted_by: "Legal Team",
		date: "Mar 12, 2026",
		read_time: "7 min read",
	},
	{
		id: "6",
		type: "video",
		title: "Real Buyer Story: First Condo Purchase",
		media:
			"https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
		thumbnail: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
		category: "STORIES",
		posted_by: "Pandora Team",
		date: "Mar 30, 2026",
	},
];
