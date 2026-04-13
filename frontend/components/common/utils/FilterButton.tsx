import { TouchableOpacity, View, StyleSheet } from "react-native";
import { SlidersHorizontal } from "lucide-react-native";
import BodyText from "@/components/common/typography/BodyText";
import { lightColors } from "@/theme/light";
import { scaleSize, moderateScale } from "@/utils/metrics";

interface FilterButtonProps {
	isOpen: boolean;
	activeCount: number;
	onPress: () => void;
	size?: number;
	iconColorWhenClosed?: string;
	iconColorWhenOpen?: string;
	badgeBackgroundColor?: string;
}

export default function FilterButton({
	isOpen,
	activeCount,
	onPress,
	size = 24,
	iconColorWhenClosed = lightColors.bigTitleText,
	iconColorWhenOpen,
	badgeBackgroundColor,
}: FilterButtonProps) {
	const iconColor = isOpen
		? iconColorWhenOpen || lightColors.brand
		: iconColorWhenClosed;

	return (
		<TouchableOpacity
			onPress={onPress}
			style={[
				styles.button,
				isOpen && { backgroundColor: lightColors.brandBG },
			]}
		>
			<View style={styles.iconWrapper}>
				<SlidersHorizontal size={moderateScale(size)} color={iconColor} />
				{activeCount > 0 && (
					<View
						style={[
							styles.badge,
							{ backgroundColor: badgeBackgroundColor || lightColors.brand },
						]}
					>
						<BodyText variant="small" style={styles.badgeText}>
							{activeCount}
						</BodyText>
					</View>
				)}
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	button: {
		padding: scaleSize(5),
		borderRadius: scaleSize(10),
	},
	iconWrapper: {
		position: "relative",
	},
	badge: {
		position: "absolute",
		top: -scaleSize(6),
		right: -scaleSize(6),
		borderRadius: scaleSize(10),
		minWidth: scaleSize(18),
		height: scaleSize(18),
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: scaleSize(4),
	},
	badgeText: {
		color: lightColors.background,
		marginBottom: 0,
	},
});
