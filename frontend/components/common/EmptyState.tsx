import { View, StyleSheet } from "react-native";
import { Search } from "lucide-react-native";
import { useTheme } from "@/hooks/useTheme";
import { NormalTitle, BodyText } from "../atoms/Typography";

interface EmptyStateProps {
	title?: string;
	message?: string;
	icon?: React.ComponentType<{ size?: number; color?: string }>;
}

export default function EmptyState({
	title = "No properties found",
	message = "Try different filters",
	icon: Icon = Search,
}: EmptyStateProps) {
	const colors = useTheme();

	return (
		<View style={styles.container}>
			<Icon size={48} color={colors.textSecondary} />
			<NormalTitle
				style={{
					color: colors.textPrimary,
					marginTop: 16,
					textAlign: "center",
				}}
			>
				{title}
			</NormalTitle>
			<BodyText
				style={{
					color: colors.textSecondary,
					marginTop: 8,
					textAlign: "center",
				}}
			>
				{message}
			</BodyText>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 32,
		marginTop: 50,
	},
});
