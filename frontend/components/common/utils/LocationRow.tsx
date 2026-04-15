import { View, StyleSheet, ViewStyle } from "react-native";
import { MapPin } from "lucide-react-native";
import BodyText from "@/components/common/typography/BodyText";
import { spacing, moderateScale } from "@/utils/metrics";
import { lightColors } from "@/theme/light";

interface LocationRowProps {
	location: string;
	iconSize?: number;
	iconColor?: string;
	textVariant?: "small" | "normal" | "large";
	containerStyle?: ViewStyle;
}

export default function LocationRow({
	location,
	iconSize = moderateScale(14),
	iconColor = lightColors.brand,
	textVariant = "normal",
	containerStyle,
}: LocationRowProps) {
	return (
		<View style={[styles.container, containerStyle]}>
			<MapPin size={iconSize} color={iconColor} />
			<BodyText variant={textVariant} style={styles.locationText}>
				{location}
			</BodyText>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		gap: spacing.xs,
		marginBottom: spacing.md,
	},
	locationText: {
		marginBottom: 0,
		flex: 1,
	},
});
