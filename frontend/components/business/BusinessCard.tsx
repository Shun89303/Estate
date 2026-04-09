import { useTheme } from "@/hooks/useTheme";
import { BusinessProperty, BusinessPropertyType } from "@/mock/business";
import { useRouter } from "expo-router";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { BodyText, NormalTitle, SmallTitle } from "../atoms/Typography";
import { Calendar, MapPin, Maximize, Users } from "lucide-react-native";
import globalStyles from "@/styles/styles";

export default function BusinessCard({
	property,
}: {
	property: BusinessProperty;
}) {
	const router = useRouter();
	const colors = useTheme();
	const pricingUnit = property.pricing.type === "MONTHLY" ? "mo" : "day";

	const typeEmoji: Record<BusinessPropertyType, string> = {
		OFFICE: "🏢",
		CO_WORKING: "💻",
		SHOP_RETAIL: "🛍️",
		WAREHOUSE: "📦",
		RESTAURANT: "🍽️",
		EVENT_VENUE: "🎪",
	};

	const displayType = `${typeEmoji[property.type]} ${property.type.replace("_", " ")}`;

	return (
		<TouchableOpacity
			onPress={() => router.push(`/business/${property.id}`)}
			activeOpacity={0.8}
			style={[styles.card, { backgroundColor: colors.background }]}
		>
			{/* Left: Square Image */}
			<View style={styles.imageContainer}>
				<Image source={{ uri: property.media.cover }} style={styles.image} />
				<View
					style={[styles.typeBadge, { backgroundColor: colors.primaryGold }]}
				>
					<SmallTitle style={styles.typeBadgeText}>{displayType}</SmallTitle>
				</View>
			</View>

			{/* Right: Info – Upper + Lower */}
			<View style={styles.infoContainer}>
				{/* UPPER PART */}
				<View>
					<NormalTitle numberOfLines={1} style={styles.title}>
						{property.title}
					</NormalTitle>
					<View style={styles.locationRow}>
						<MapPin size={12} color={colors.primaryGold} />
						<BodyText style={styles.address} numberOfLines={1}>
							{property.location.address}
						</BodyText>
					</View>
					<View style={styles.specsRow}>
						<View style={styles.specItem}>
							<Maximize size={12} color={colors.textSecondary} />
							<BodyText style={styles.specText}>
								{property.areaSqm} sqm
							</BodyText>
						</View>
						<View style={styles.specItem}>
							<Users size={12} color={colors.textSecondary} />
							<BodyText style={styles.specText}>
								{property.capacity} pax
							</BodyText>
						</View>
					</View>
				</View>

				{/* LOWER PART */}
				<View style={styles.bottomRow}>
					<View style={styles.specItem}>
						<Calendar size={12} color={colors.textSecondary} />
						{property.minLeaseMonths ? (
							<BodyText style={styles.specText}>
								{property.minLeaseMonths} mo min
							</BodyText>
						) : (
							<BodyText style={styles.specText}>Flexible</BodyText>
						)}
					</View>
					<NormalTitle
						style={{
							fontSize: 16,
							fontWeight: "bold",
							color: colors.primaryGold,
						}}
					>
						฿{property.pricing.amount.toLocaleString()}/{pricingUnit}
					</NormalTitle>
				</View>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 16,
		paddingVertical: 8,
	},

	// Card styles
	card: {
		flexDirection: "row",
		borderRadius: 12,
		marginBottom: 12,
		overflow: "hidden",
		...globalStyles.shadows,
	},
	imageContainer: {
		width: 130,
		alignSelf: "stretch",
		position: "relative",
	},
	image: {
		flex: 1,
		width: "100%",
		resizeMode: "cover",
	},
	typeBadge: {
		position: "absolute",
		top: 8,
		left: 8,
		paddingHorizontal: 6,
		paddingVertical: 2,
		borderRadius: 99,
	},
	typeBadgeText: {
		color: "#fff",
		fontSize: 10,
		fontWeight: "bold",
	},
	infoContainer: {
		flex: 1,
		padding: 10,
		justifyContent: "space-between",
		paddingVertical: 20,
	},
	headerRow: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 4,
	},
	title: {
		marginBottom: 4,
		lineHeight: 20,
	},
	locationRow: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 8,
	},
	address: {
		marginLeft: 4,
		fontSize: 12,
		flexShrink: 1,
	},
	bottomRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginTop: 8,
	},
	specsRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
		marginTop: 4,
	},
	specsColumn: {
		flexDirection: "column",
		gap: 4,
	},
	specItem: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
	},
	specText: {
		fontSize: 12,
	},
});
