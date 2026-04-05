export interface Reserve {
	id: number;
	image: string;
	title: string;
	location: string;
	status: "Approved" | "Pending Review";
	price: number;
	coins: number;
}

export const MOCK_RESERVES: Reserve[] = [
	{
		id: 1,
		image:
			"http://localhost:3000/uploads/properties/off_plan/horizon_sukhumvit48/cover/horizon_sukhumvit48_cover.jpg",
		title: "Seaside Condo Reservation",
		location: "Pattaya, Jomtien",
		status: "Approved",
		price: 5600000,
		coins: 5,
	},
	{
		id: 2,
		image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914",
		title: "Modern Pool Villa",
		location: "Phuket, Patong",
		status: "Pending Review",
		price: 12500000,
		coins: 10,
	},
];
