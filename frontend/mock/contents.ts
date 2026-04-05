export interface Content {
	id: string;
	type: "article" | "video";
	title: string;
	media: string; // image for article, video file for video
	thumbnail?: string; // thumbnail image for video
	posted_by: string;
	date: string;
}

export const MOCK_CONTENTS: Content[] = [
	{
		id: "1",
		type: "article",
		title: "Top 5 Properties in Bangkok You Must See",
		media: "https://images.unsplash.com/photo-1599423300746-b62533397364",
		posted_by: "Admin",
		date: "2026-04-01",
	},
	{
		id: "2",
		type: "video",
		title: "Luxury Apartment Tour in Chiang Mai",
		media:
			"https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
		thumbnail: "https://images.unsplash.com/photo-1599423300746-b62533397364", // video thumbnail
		posted_by: "Jane Doe",
		date: "2026-03-28",
	},
	{
		id: "3",
		type: "video",
		title: "Condo Investment Tips for Expats",
		media:
			"https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
		thumbnail: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914", // video thumbnail
		posted_by: "John Smith",
		date: "2026-03-25",
	},
];
