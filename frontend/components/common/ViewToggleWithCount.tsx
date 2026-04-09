import { View, TouchableOpacity, StyleSheet } from "react-native";
import { List, Map as MapIcon } from "lucide-react-native";
import { useTheme } from "@/hooks/useTheme";
import { BodyText } from "../atoms/Typography";

interface ViewToggleWithCountProps {
	count: number;
	countLabel?: string; // e.g., "properties found", "rooms found"
	viewMode: "list" | "map";
	onViewModeChange: (mode: "list" | "map") => void;
	countStyle?: object;
	containerStyle?: object;
}

export default function ViewToggleWithCount({
	count,
	countLabel = "items found",
	viewMode,
	onViewModeChange,
	countStyle,
	containerStyle,
}: ViewToggleWithCountProps) {
	const colors = useTheme();

	return (
		<View style={[styles.container, containerStyle]}>
			<BodyText style={countStyle}>
				{count} {countLabel}
			</BodyText>

			<View
				style={[
					styles.toggleContainer,
					{
						backgroundColor: colors.primaryMute,
					},
				]}
			>
				<TouchableOpacity
					style={[
						styles.toggleButton,
						viewMode === "list" && styles.toggleButtonActive,
					]}
					onPress={() => onViewModeChange("list")}
				>
					<List
						size={18}
						color={viewMode === "list" ? colors.textPrimary : "#666"}
					/>
				</TouchableOpacity>
				<TouchableOpacity
					style={[
						styles.toggleButton,
						viewMode === "map" && styles.toggleButtonActive,
					]}
					onPress={() => onViewModeChange("map")}
				>
					<MapIcon
						size={18}
						color={viewMode === "map" ? colors.textPrimary : "#666"}
					/>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 16,
		paddingVertical: 10,
	},
	toggleContainer: {
		flexDirection: "row",
		borderRadius: 30,
		padding: 4,
	},
	toggleButton: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 16,
		paddingVertical: 6,
		borderRadius: 30,
	},
	toggleButtonActive: {
		backgroundColor: "#fff",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
		elevation: 2,
	},
});
