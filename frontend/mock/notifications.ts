export type NotificationType =
	| "welcome"
	| "booking"
	| "price"
	| "listings"
	| "special";

export type Notification = {
	id: number;
	title: string;
	body: string;
	createdAt: Date;
	read: boolean;
	type: NotificationType;
};

export const MOCK_NOTIFICATIONS: Notification[] = [
	{
		id: 1,
		title: "Welcome to the App",
		body: "Start exploring properties near you.",
		createdAt: new Date(Date.now() - 5 * 60 * 1000),
		read: false,
		type: "welcome",
	},
	{
		id: 2,
		title: "Booking Confirmed",
		body: "Your property viewing has been scheduled.",
		createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
		read: false,
		type: "booking",
	},
	{
		id: 3,
		title: "Price Dropped",
		body: "A saved property has reduced its price.",
		createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
		read: false,
		type: "price",
	},
	{
		id: 4,
		title: "New Listings Available",
		body: "Check out the latest properties in your area.",
		createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
		read: true,
		type: "listings",
	},
	{
		id: 5,
		title: "Special Offer",
		body: "Limited-time promotion available now.",
		createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
		read: true,
		type: "special",
	},
];
