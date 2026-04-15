import { View, TouchableOpacity, StyleSheet } from "react-native";
import { List, Map as MapIcon, GitCompareArrows } from "lucide-react-native";
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
	// Compare feature props
	showCompare?: boolean;
	isCompareMode?: boolean;
	onComparePress?: () => void;
}

export default function ViewToggleWithCount({
	count,
	countLabel = "items found",
	viewMode,
	onViewModeChange,
	countStyle,
	containerStyle,
	showCompare = false,
	isCompareMode = false,
	onComparePress,
}: ViewToggleWithCountProps) {
	return (
		<View style={[styles.container, containerStyle]}>
			<BodyText variant="normal" style={countStyle}>
				{count} {countLabel}
			</BodyText>

			<View style={styles.rightGroup}>
				{showCompare && (
					<TouchableOpacity
						style={[
							styles.compareButton,
							{
								backgroundColor: isCompareMode
									? lightColors.brand
									: lightColors.mutedBackgroundWeaker,
							},
						]}
						onPress={onComparePress}
						activeOpacity={0.7}
					>
						<GitCompareArrows
							size={moderateScale(16)}
							color={isCompareMode ? "#fff" : lightColors.bigTitleText}
						/>
						<BodyText
							variant="small"
							style={{
								marginBottom: 0,
								marginLeft: spacing.xs,
								color: isCompareMode ? "#fff" : lightColors.bigTitleText,
							}}
						>
							Compare
						</BodyText>
					</TouchableOpacity>
				)}

				<View
					style={[
						styles.toggleContainer,
						{ backgroundColor: lightColors.mutedBackgroundWeaker },
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
						<MapIcon
							size={moderateScale(18)}
							color={lightColors.bigTitleText}
						/>
					</TouchableOpacity>
				</View>
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
		backgroundColor: lightColors.background,
	},
	rightGroup: {
		flexDirection: "row",
		alignItems: "center",
		gap: spacing.md,
	},
	compareButton: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: spacing.sm,
		paddingVertical: scaleSize(6),
		borderRadius: scaleSize(20),
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
