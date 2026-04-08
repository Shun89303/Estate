import { useRouter } from "expo-router";
import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";
import { BedDouble, Bath, Maximize, MapPin } from "lucide-react-native";
import { Property } from "@/mock/buySell";
import { BodyText, PageTitle, SmallTitle } from "@/components/atoms/Typography";

export default function HomePropertyCard({ property }: { property: Property }) {
	const router = useRouter();

	return (
		<TouchableOpacity
			onPress={() => router.push(`/buySell/${property.id}`)}
			activeOpacity={0.8}
			style={styles.cardContainer}
		>
			{/* UPPER SIDE */}
			<View style={styles.upperSide}>
				<Image
					source={{ uri: property.media.cover }}
					style={styles.coverImage}
				/>
				{property.isNew && <SmallTitle style={styles.newBadge}>NEW</SmallTitle>}
				<View style={styles.priceContainer}>
					<PageTitle style={styles.price}>
						฿{property.price.toLocaleString()}
					</PageTitle>
				</View>
			</View>

			{/* BOTTOM SIDE */}
			<View style={styles.bottomSide}>
				<SmallTitle>{property.title}</SmallTitle>

				{/* Location with icon */}
				<View style={styles.locationRow}>
					<MapPin size={14} color="#da9a0fff" />
					<BodyText style={styles.locationText}>
						{property.location.address}
					</BodyText>
				</View>

				<View style={styles.divider} />

				{/* Specs row with Lucide icons */}
				<View style={styles.specsRow}>
					<View style={styles.specItem}>
						<BedDouble size={14} color="#555" />
						<Text style={styles.spec}>{property.bedrooms} bed</Text>
					</View>
					<View style={styles.specItem}>
						<Bath size={14} color="#555" />
						<Text style={styles.spec}>{property.bathrooms} bath</Text>
					</View>
					<View style={styles.specItem}>
						<Maximize size={14} color="#555" />
						<Text style={styles.spec}>{property.areaSqm} sqm</Text>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	cardContainer: {
		backgroundColor: "#fff",
		borderRadius: 12,
		marginBottom: 16,
		overflow: "hidden",
	},
	upperSide: {
		position: "relative",
		height: 180,
	},
	coverImage: {
		width: "100%",
		height: "100%",
	},
	newBadge: {
		position: "absolute",
		top: 10,
		left: 10,
		backgroundColor: "#da9a0fff",
		color: "#fff",
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 4,
		fontSize: 12,
		fontWeight: "bold",
	},
	priceContainer: {
		position: "absolute",
		bottom: 10,
		left: 10,
		backgroundColor: "rgba(0,0,0,0.6)",
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 4,
	},
	price: {
		color: "#fff",
	},
	bottomSide: {
		padding: 12,
	},
	locationRow: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 4,
	},
	locationText: {
		marginLeft: 6,
		color: "#666",
	},
	divider: {
		height: 1,
		backgroundColor: "#eee",
		marginVertical: 8,
	},
	specsRow: {
		flexDirection: "row",
		justifyContent: "flex-start",
		gap: 12,
	},
	specItem: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
	},
	spec: {
		fontSize: 12,
		color: "#555",
	},
});
