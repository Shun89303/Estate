export const mainTabs = {
	index: { title: "Home" },
	search: { title: "Search" },
	saved: { title: "Saved" },
	bookings: { title: "Bookings" },
	profile: { title: "Profile" },
} as const;

export type TabKey = keyof typeof mainTabs;
