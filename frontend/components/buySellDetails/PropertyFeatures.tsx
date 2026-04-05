import { View, Text, StyleSheet } from "react-native";
import { Property } from "@/stores/usePropertyStore";

export default function PropertyFeatures({ property }: { property: Property }) {
	return (
		<View style={styles.container}>
			{/* Features Section */}
			<Text style={styles.sectionTitle}>Features</Text>
			<View style={styles.featuresRow}>
				{property.features?.length ? (
					property.features.map((f) => (
						<View key={f.id} style={styles.featureBox}>
							<Text style={styles.featureText}>{f.name}</Text>
						</View>
					))
				) : (
					<Text style={styles.noContent}>No features provided.</Text>
				)}
			</View>

			{/* About Section */}
			<Text style={[styles.sectionTitle, { marginTop: 16 }]}>About</Text>
			<Text style={styles.aboutText}>
				{property.description || "No additional information provided."}
			</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { padding: 16 },
	sectionTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 8 },
	featuresRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
	featureBox: {
		backgroundColor: "#eee",
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 4,
		marginRight: 4,
		marginBottom: 4,
	},
	featureText: { fontSize: 12, color: "#333" },
	noContent: { fontSize: 12, color: "#777" },
	aboutText: { fontSize: 14, color: "#555", marginTop: 4 },
});
