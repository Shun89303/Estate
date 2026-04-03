import { useTheme } from "@/hooks/useTheme";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import { mainTabs, TabKey } from "@/navigation/mainTabs";
import TabButton from "./TabButton";
import globalStyles from "@/styles/styles";
import { tabUI } from "@/constants/ui/tab";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CustomTabBar({ state, navigation }: BottomTabBarProps) {
	const colors = useTheme();
	const tabKeys = Object.keys(mainTabs) as TabKey[];
	const insets = useSafeAreaInsets();

	const containerStyle = {
		position: "absolute" as const,
		bottom: 0,
		left: 0,
		right: 0,
		height: tabUI.height + insets.bottom,
		backgroundColor: colors.background,
		paddingTop: tabUI.paddingTop,
		paddingBottom: insets.bottom + tabUI.paddingBottom,
		flexDirection: "row" as const,
		...globalStyles.shadows,
	};

	return (
		<View style={containerStyle}>
			{tabKeys.map((key, index) => (
				<TabButton
					key={key}
					tabKey={key}
					isActive={state.index === index}
					onPress={() => navigation.navigate(key)}
					index={index}
				/>
			))}
		</View>
	);
}
