import { API_BASE_URL } from "@/config/api";

export interface Consultation {
	id: number;
	image: string;
	title: string;
	location: string;
	agent: string;
	agentImage: string;
	date: string;
	time: string;
	method: "Zoom" | "Call";
	status: "Upcoming" | "Completed";
}

export const MOCK_CONSULTATIONS: Consultation[] = [
	{
		id: 1,
		image: `${API_BASE_URL}/uploads/properties/buy/condo_sukhumvit24/cover/condo_sukhumvit24_cover.jpg`,
		title: "Property Investment Consultation in Bangkok",
		location: "Sukhumvit 24, Phrom Phong",
		agent: "Aye Thandar",
		agentImage: `${API_BASE_URL}/uploads/agents/agent3.jpg`,
		date: "April 5, 2026",
		time: "10:00 AM",
		method: "Zoom",
		status: "Upcoming",
	},
	{
		id: 2,
		image: `${API_BASE_URL}/uploads/properties/owner_direct/owner_condo_onnut/cover/owner_condo_onnut_cover.jpg`,
		title: "Luxury Condo Buying Advice",
		location: "Phahonyothin, Ari",
		agent: "Ko Min",
		agentImage: `${API_BASE_URL}/uploads/agents/agent2.jpg`,
		date: "March 28, 2026",
		time: "2:00 PM",
		method: "Call",
		status: "Completed",
	},
];
