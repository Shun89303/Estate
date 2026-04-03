import CustomTabBar from "@/components/navigation/CustomTabbar";
import { useTheme } from "@/hooks/useTheme";
import { Tabs } from "expo-router";

export default function TabLayout() {
	const colors = useTheme();

	return (
		<Tabs
			tabBar={(props) => <CustomTabBar {...props} />}
			screenOptions={{
				headerShown: false,
				// fixes the sudden white flash during transition
				sceneStyle: { backgroundColor: colors.appBackground },
			}}
		>
			<Tabs.Screen name="index" />
			<Tabs.Screen name="search" />
			<Tabs.Screen name="saved" />
			<Tabs.Screen name="bookings" />
			<Tabs.Screen name="profile" />
		</Tabs>
	);
}
