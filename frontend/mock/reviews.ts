import { API_BASE_URL } from "@/config/api";

export interface Review {
	id: number;
	video: string;
	thumbnail: string;
	profile_image: string;
	title: string;
	name: string;
	property_name: string;
	rating: number;
	duration: string;
}

export const MOCK_REVIEWS: Review[] = [
	{
		id: 1,
		video: `${API_BASE_URL}/uploads/properties/buy/condo_sukhumvit24/videos/condo_sukhumvit24_video.mp4`,
		thumbnail: `${API_BASE_URL}/uploads/buySell/one/oneCover.jpg`,
		profile_image: "https://randomuser.me/api/portraits/men/10.jpg",
		title: "Very smooth condo purchase!",
		name: "Somchai",
		property_name: "Sukhumvit 24 Condo",
		rating: 5,
		duration: "2:30",
	},
	{
		id: 2,
		video: `${API_BASE_URL}/uploads/properties/buy/condo_sukhumvit24/videos/condo_sukhumvit24_video.mp4`,
		thumbnail: `${API_BASE_URL}/uploads/buySell/two/twoCover.jpg`,
		profile_image: "https://randomuser.me/api/portraits/women/12.jpg",
		title: "Agent was extremely helpful",
		name: "Nok",
		property_name: "Bangna House",
		rating: 4,
		duration: "1:45",
	},
	{
		id: 3,
		video: `${API_BASE_URL}/uploads/properties/buy/condo_sukhumvit24/videos/condo_sukhumvit24_video.mp4`,
		thumbnail: `${API_BASE_URL}/uploads/buySell/three/threeCover.jpg`,
		profile_image: "https://randomuser.me/api/portraits/men/15.jpg",
		title: "Fast process and great support",
		name: "Arthit",
		property_name: "Sathorn Penthouse",
		rating: 5,
		duration: "3:10",
	},
];
