import { Calendar, Heart, House, Search, User } from "lucide-react-native";
import { TabKey } from "./mainTabs";

export const iconMap: Record<TabKey, React.ComponentType<any>> = {
	index: House,
	search: Search,
	saved: Heart,
	bookings: Calendar,
	profile: User,
};
