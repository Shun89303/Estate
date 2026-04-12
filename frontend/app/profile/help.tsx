import BackButton from "@/components/common/navigation/BackButton";
import { Pressable, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/hooks/useTheme";
import {
	BodyText,
	NormalTitle,
	PageTitle,
} from "@/components/atoms/Typography";
import {
	ChevronRight,
	MessageCircle,
	Mail,
	FileText,
} from "lucide-react-native";
import globalStyles from "@/styles/styles";

export default function Help() {
	const colors = useTheme();

	const helpOptions = [
		{
			id: "faq",
			title: "FAQs",
			subtitle: "Frequently asked questions",
			icon: FileText,
		},
		{
			id: "chat",
			title: "Live Chat",
			subtitle: "Chat with our support team",
			icon: MessageCircle,
		},
		{
			id: "email",
			title: "Email Us",
			subtitle: "support@myhome.mm",
			icon: Mail,
		},
	];

	return (
		<SafeAreaView style={[styles.container]}>
			<View style={styles.headerRow}>
				<BackButton />
				<PageTitle style={styles.header}>Help & Support</PageTitle>
			</View>

			{helpOptions.map((option) => (
				<Pressable
					key={option.id}
					style={[
						styles.card,
						{ backgroundColor: "#fff", ...globalStyles.shadows },
					]}
				>
					<View style={styles.leftSection}>
						<View
							style={[
								styles.iconContainer,
								{ backgroundColor: colors.primaryGold + "20" },
							]}
						>
							<option.icon size={20} color={colors.primaryGold} />
						</View>
						<View style={styles.textContainer}>
							<NormalTitle style={styles.cardTitle}>{option.title}</NormalTitle>
							<BodyText
								style={[styles.cardSubtitle, { color: colors.textSecondary }]}
							>
								{option.subtitle}
							</BodyText>
						</View>
					</View>
					<ChevronRight size={20} color={colors.textSecondary} />
				</Pressable>
			))}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
	},
	headerRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
		marginBottom: 24,
	},
	header: {
		marginBottom: 0,
	},
	card: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		padding: 16,
		borderRadius: 16,
		marginBottom: 12,
	},
	leftSection: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
		flex: 1,
	},
	iconContainer: {
		width: 40,
		height: 40,
		borderRadius: 12,
		alignItems: "center",
		justifyContent: "center",
	},
	textContainer: {
		flex: 1,
	},
	cardTitle: {
		fontSize: 16,
		fontWeight: "600",
		marginBottom: 2,
	},
	cardSubtitle: {
		fontSize: 12,
	},
});
