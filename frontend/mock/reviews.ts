export interface Review {
	id: number;
	video: string; // original video URL
	thumbnail: string; // new thumbnail image URL
	profile_image: string;
	title: string;
	name: string;
	rating: number;
}

export const MOCK_REVIEWS: Review[] = [
	{
		id: 1,
		video: "https://www.w3schools.com/html/mov_bbb.mp4",
		thumbnail: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2", // sample thumbnail
		profile_image: "https://randomuser.me/api/portraits/men/10.jpg",
		title: "Very smooth condo purchase!",
		name: "Somchai",
		rating: 5,
	},
	{
		id: 2,
		video: "https://www.w3schools.com/html/movie.mp4",
		thumbnail: "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
		profile_image: "https://randomuser.me/api/portraits/women/12.jpg",
		title: "Agent was extremely helpful",
		name: "Nok",
		rating: 4,
	},
	{
		id: 3,
		video: "https://www.w3schools.com/html/mov_bbb.mp4",
		thumbnail: "https://images.unsplash.com/photo-1505691723518-36a5c32b8721",
		profile_image: "https://randomuser.me/api/portraits/men/15.jpg",
		title: "Fast process and great support",
		name: "Arthit",
		rating: 5,
	},
];
