import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Frown } from "lucide-react-native";
import BackButton from "./BackButton";
import { PageTitle, BodyText } from "../atoms/Typography";
import { useTheme } from "@/hooks/useTheme";

interface NotFoundProps {
	title?: string;
	message?: string;
	icon?: React.ComponentType<{ size?: number; color?: string; style?: object }>;
	showBack?: boolean;
}

export default function NotFound({
	title = "Property Not Found",
	message = "The property you're looking for doesn't exist or has been removed.",
	icon: Icon = Frown,
	showBack = true,
}: NotFoundProps) {
	const colors = useTheme();

	return (
		<SafeAreaView
			style={[styles.container, { backgroundColor: colors.background }]}
		>
			{showBack && <BackButton style={styles.backButton} />}
			<View style={styles.content}>
				<Icon size={64} color={colors.textSecondary} style={styles.icon} />
				<PageTitle style={{ color: colors.textPrimary, marginBottom: 8 }}>
					{title}
				</PageTitle>
				<BodyText style={{ color: colors.textSecondary, textAlign: "center" }}>
					{message}
				</BodyText>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1 },
	backButton: {
		zIndex: 10,
		alignSelf: "flex-start",
		marginLeft: 10,
	},
	content: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 24,
	},
	icon: {
		marginBottom: 24,
	},
});
