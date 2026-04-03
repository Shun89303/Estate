import { mainTabs, TabKey } from "@/navigation/mainTabs";
import { iconMap } from "@/navigation/tabIcons";
import React from "react";
import { Text, TouchableWithoutFeedback } from "react-native";
import Animated from "react-native-reanimated";
import { tabUI } from "@/constants/ui/tab";

interface TabButtonProps {
	tabKey: TabKey;
	isActive: boolean;
	onPress: () => void;
	index: number;
}

export default function TabButton({
	tabKey,
	isActive,
	onPress,
	index,
}: TabButtonProps) {
	const IconComponent = iconMap[tabKey];
	const title = mainTabs[tabKey].title;

	return (
		<TouchableWithoutFeedback onPress={onPress}>
			<Animated.View
				style={{
					flex: 1,
					alignItems: "center",
					justifyContent: "center",
					paddingVertical: tabUI.button.paddingVertical,
				}}
			>
				<IconComponent size={tabUI.icon.size} color={"black"} />
				<Text
					style={{
						fontSize: tabUI.label.fontSize, // Simplified, config can override if needed
						fontWeight: isActive ? "bold" : ("500" as const),
						color: isActive ? "black" : "gray",
						marginTop: tabUI.label.marginTop,
						lineHeight: tabUI.label.lineHeight,
					}}
				>
					{title}
				</Text>
			</Animated.View>
		</TouchableWithoutFeedback>
	);
}
