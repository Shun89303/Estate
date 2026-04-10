import { StyleSheet, View } from "react-native";
import { SmallTitle, BodyText } from "@/components/atoms/Typography";
import { useTheme } from "@/hooks/useTheme";

interface MetricProps {
	icon: React.ComponentType<{ size: number; color: string }>;
	value: string;
	label: string;
	iconColor: string;
	valueColor: string;
	bgColor: string;
}

export default function Metric({
	icon: Icon,
	value,
	label,
	iconColor,
	valueColor,
	bgColor,
}: MetricProps) {
	const colors = useTheme();

	return (
		<View style={[styles.metric, { backgroundColor: bgColor }]}>
			<Icon size={16} color={iconColor} />
			<SmallTitle
				style={{ color: valueColor, fontSize: 16, fontWeight: "bold" }}
			>
				{value}
			</SmallTitle>
			<BodyText style={{ color: colors.textSecondary, fontSize: 10 }}>
				{label}
			</BodyText>
		</View>
	);
}

const styles = StyleSheet.create({
	metric: {
		alignItems: "center",
		flex: 1,
		paddingVertical: 6,
		borderRadius: 12,
		gap: 4,
	},
});
