import { View, Text, Image, StyleSheet } from "react-native";
import { Property } from "@/stores/usePropertyStore";
import { API_BASE_URL } from "@/config/api";
import { FontAwesome } from "@expo/vector-icons"; // Expo icon

export default function PropertyAgent({ property }: { property: Property }) {
	if (!property.agent) return null;

	const agent = property.agent;

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Property Agent</Text>
			<View style={styles.content}>
				<Image
					source={{
						uri:
							(agent.profile_image &&
								`${API_BASE_URL}/${agent.profile_image}`) ||
							"https://via.placeholder.com/50",
					}}
					style={styles.image}
				/>
				<View style={styles.info}>
					<Text style={styles.name}>{agent.name}</Text>
					<Text style={styles.experience}>
						{agent.experience} years experience
					</Text>
					<View style={styles.ratingRow}>
						<FontAwesome name="star" size={12} color="#f5a623" />
						<Text style={styles.ratingValue}> {agent.rating}</Text>
						<Text style={styles.reviews}> ({agent.reviews_count})</Text>
					</View>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 16,
		backgroundColor: "#fff",
		borderRadius: 8,
		marginVertical: 8,
		elevation: 2,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
	},
	title: {
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 12,
	},
	content: { flexDirection: "row", alignItems: "center" },
	image: { width: 50, height: 50, borderRadius: 25, marginRight: 12 },
	info: { flex: 1 },
	name: { fontWeight: "bold", fontSize: 14, marginBottom: 4 },
	experience: { fontSize: 12, color: "#555", marginBottom: 4 },
	ratingRow: { flexDirection: "row", alignItems: "center" },
	ratingValue: { fontSize: 12, color: "#555", marginLeft: 2 },
	reviews: { fontSize: 12, color: "#555", marginLeft: 4 },
});
