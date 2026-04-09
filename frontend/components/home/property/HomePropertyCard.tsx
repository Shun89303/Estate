import { useRouter } from "expo-router";
import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";
import { BedDouble, Bath, Maximize, MapPin } from "lucide-react-native";
import { Property } from "@/mock/buySell";
import { BodyText, PageTitle, SmallTitle } from "@/components/atoms/Typography";
import { useTheme } from "@/hooks/useTheme";

export default function HomePropertyCard({ property }: { property: Property }) {
	const router = useRouter();
	const colors = useTheme();

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

				{/* Dark overlay for better text contrast */}
				<View style={styles.overlay} />

				{property.isNew && (
					<SmallTitle
						style={{
							backgroundColor: colors.primaryGold,
							position: "absolute",
							top: 10,
							left: 10,
							color: "#fff",
							paddingHorizontal: 8,
							paddingVertical: 4,
							borderRadius: 99,
							fontSize: 12,
							fontWeight: "bold",
							zIndex: 1,
						}}
					>
						NEW
					</SmallTitle>
				)}

				<View style={styles.priceContainer}>
					<PageTitle style={styles.priceText}>
						฿{property.price.toLocaleString()}
					</PageTitle>
				</View>
			</View>

			{/* BOTTOM SIDE (unchanged) */}
			<View style={styles.bottomSide}>
				<SmallTitle>{property.title}</SmallTitle>
				<View style={styles.locationRow}>
					<MapPin size={14} color="#da9a0fff" />
					<BodyText style={styles.locationText}>
						{property.location.address}
					</BodyText>
				</View>
				<View style={styles.divider} />
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
	overlay: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: "rgba(0,0,0,0.25)", // dark semi‑transparent
	},
	priceContainer: {
		position: "absolute",
		bottom: 0,
		left: 0,
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 4,
		zIndex: 1,
	},
	priceText: {
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
