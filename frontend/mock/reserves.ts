export interface Reserve {
	id: number;
	image: string;
	title: string;
	location: string;
	status: "Approved" | "Pending Review";
	price: string;
	coins: number;
	agentImage: string;
	agentName: string;
	reservedDate: string;
	details: string;
	depositAmount: number;
}

export const MOCK_RESERVES: Reserve[] = [
	{
		id: 1,
		image:
			"http://localhost:3000/uploads/properties/off_plan/horizon_sukhumvit48/cover/horizon_sukhumvit48_cover.jpg",
		title: "Seaside Condo Reservation",
		location: "Pattaya, Jomtien",
		status: "Approved",
		price: "5.6M",
		coins: 5,
		agentImage: "http://localhost:3000/uploads/agents/agent1.jpg",
		agentName: "U Kyaw Zin",
		reservedDate: "March 30, 2026",
		details: "2 Bed / 2 Bath, 85 sqm, Floor 18. Fully furnished.",
		depositAmount: 200000,
	},
	{
		id: 2,
		image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914",
		title: "Modern Pool Villa",
		location: "Phuket, Patong",
		status: "Pending Review",
		price: "12,000/mo",
		coins: 10,
		agentImage: "http://localhost:3000/uploads/agents/agent2.jpg",
		agentName: "Aye Thandar",
		reservedDate: "April 2, 2026",
		details: "Move-in: April 15. Furnished, WiFi included. 6-month min.",
		depositAmount: 200000,
	},
];
