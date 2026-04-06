import { useRouter } from "expo-router";
import { Pressable, Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Help() {
	const router = useRouter();

	const helpOptions = [
		{ title: "FAQs", subtitle: "Frequently asked questions" },
		{ title: "Live Chat", subtitle: "Chat with our support team" },
		{ title: "Email Us", subtitle: "support@myhome.mm" },
	];

	return (
		<SafeAreaView style={styles.container}>
			{/* Back */}
			<Pressable onPress={() => router.back()}>
				<Text style={styles.back}>Back</Text>
			</Pressable>

			{/* Header */}
			<Text style={styles.header}>Help & Support</Text>

			{/* Options */}
			{helpOptions.map((option, index) => (
				<Pressable key={index} style={styles.box}>
					<View style={styles.boxText}>
						<Text style={styles.boxTitle}>{option.title}</Text>
						<Text style={styles.boxSubtitle}>{option.subtitle}</Text>
					</View>
					<Text style={styles.chevron}>›</Text>
				</Pressable>
			))}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		padding: 16,
	},

	back: {
		fontSize: 14,
		color: "#007bff",
		marginBottom: 12,
	},

	header: {
		fontSize: 20,
		fontWeight: "700",
		marginBottom: 24,
	},

	box: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		backgroundColor: "#f9f9f9",
		padding: 16,
		borderRadius: 12,
		marginBottom: 12,
	},

	boxText: {
		flex: 1,
	},

	boxTitle: {
		fontSize: 14,
		fontWeight: "600",
		marginBottom: 2,
	},

	boxSubtitle: {
		fontSize: 12,
		color: "#666",
	},

	chevron: {
		fontSize: 18,
		color: "#888",
		marginLeft: 12,
	},
});
