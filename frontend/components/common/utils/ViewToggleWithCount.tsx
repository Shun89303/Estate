import { View, TouchableOpacity, StyleSheet } from "react-native";
import { List, Map as MapIcon } from "lucide-react-native";
import BodyText from "@/components/common/typography/BodyText";
import { lightColors } from "@/theme/light";
import { spacing, scaleSize, moderateScale } from "@/utils/metrics";

interface ViewToggleWithCountProps {
	count: number;
	countLabel?: string;
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
	return (
		<View style={[styles.container, containerStyle]}>
			<BodyText variant="normal" style={countStyle}>
				{count} {countLabel}
			</BodyText>

			<View
				style={[
					styles.toggleContainer,
					{ backgroundColor: lightColors.mutedBackground },
				]}
			>
				<TouchableOpacity
					style={[
						styles.toggleButton,
						viewMode === "list" && styles.toggleButtonActive,
					]}
					onPress={() => onViewModeChange("list")}
				>
					<List size={moderateScale(18)} color={lightColors.bigTitleText} />
				</TouchableOpacity>
				<TouchableOpacity
					style={[
						styles.toggleButton,
						viewMode === "map" && styles.toggleButtonActive,
					]}
					onPress={() => onViewModeChange("map")}
				>
					<MapIcon size={moderateScale(18)} color={lightColors.bigTitleText} />
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
		paddingHorizontal: spacing.lg,
		paddingVertical: scaleSize(10),
	},
	toggleContainer: {
		flexDirection: "row",
		borderRadius: scaleSize(30),
		padding: scaleSize(4),
	},
	toggleButton: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: spacing.sm,
		paddingVertical: scaleSize(6),
		borderRadius: scaleSize(30),
	},
	toggleButtonActive: {
		backgroundColor: lightColors.background,
	},
});
