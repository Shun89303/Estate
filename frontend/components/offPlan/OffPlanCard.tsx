import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { TrendingUp, Calendar, MapPin, Building2 } from "lucide-react-native";
import { OffPlanProperty } from "@/mock/offPlan";
import {
	BodyText,
	NormalTitle,
	SmallTitle,
} from "@/components/atoms/Typography";
import { useTheme } from "@/hooks/useTheme";
import Metric from "./Metric";

export default function OffPlanCard({
	property,
}: {
	property: OffPlanProperty;
}) {
	const router = useRouter();
	const colors = useTheme();

	const metricColors = {
		rentalYield: { bg: "#E8F5E9", icon: "#2E7D32", value: "#1B5E20" },
		annualGrowth: { bg: "#E3F2FD", icon: "#1565C0", value: "#0D47A1" },
		available: { bg: "#FFF3E0", icon: "#E65100", value: "#BF360C" },
	};

	return (
		<TouchableOpacity
			style={[styles.card, { backgroundColor: colors.background }]}
			activeOpacity={0.8}
			onPress={() => router.push(`/property/offPlan/${property.uniqueCode}`)}
		>
			{/* Upper section with image and overlays */}
			<View style={styles.imageContainer}>
				<Image source={{ uri: property.media.cover }} style={styles.image} />
				<View style={styles.darkOverlay} />
				<View style={[styles.badge, { backgroundColor: colors.primaryGold }]}>
					<SmallTitle style={styles.badgeText}>OFF-PLAN</SmallTitle>
				</View>
				<View style={styles.completion}>
					<Calendar size={12} color="#fff" />
					<BodyText style={{ color: "#fff" }}>
						{property.completionDate}
					</BodyText>
				</View>
				<View style={styles.price}>
					<BodyText style={styles.priceText}>{property.priceRange}</BodyText>
				</View>
			</View>

			{/* Bottom info */}
			<View style={styles.bottom}>
				<SmallTitle style={styles.developer}>
					{property.developer.name}
				</SmallTitle>
				<NormalTitle style={styles.name}>{property.title}</NormalTitle>
				<View style={styles.locationRow}>
					<MapPin size={12} color={colors.primaryGold} />
					<BodyText style={styles.location}>
						{property.locationAddress}
					</BodyText>
				</View>
				<View style={styles.metricsRow}>
					<Metric
						icon={TrendingUp}
						value={property.rentalYield}
						label="Rental Yield"
						iconColor={metricColors.rentalYield.icon}
						valueColor={metricColors.rentalYield.value}
						bgColor={metricColors.rentalYield.bg}
					/>
					<Metric
						icon={TrendingUp}
						value={property.annualGrowth}
						label="Est. Growth"
						iconColor={metricColors.available.icon}
						valueColor={metricColors.available.value}
						bgColor={metricColors.available.bg}
					/>
					<Metric
						icon={Building2}
						value={property.unitsLeft.toString()}
						label="Available"
						iconColor={"black"}
						valueColor={"black"}
						bgColor={colors.primaryGray + 30}
					/>
				</View>
				<View style={styles.unitRow}>
					{property.units.map((u, idx) => (
						<View
							key={idx}
							style={[
								styles.unitType,
								{ backgroundColor: colors.secondaryMute },
							]}
						>
							<SmallTitle
								style={{
									fontSize: 10,
									color: colors.primaryGray,
								}}
							>
								{u.type}
							</SmallTitle>
						</View>
					))}
				</View>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	card: {
		marginBottom: 16,
		borderRadius: 12,
		overflow: "hidden",
	},
	imageContainer: { position: "relative" },
	image: { width: "100%", height: 180 },
	darkOverlay: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: "rgba(0,0,0,0.25)",
	},
	badge: {
		position: "absolute",
		top: 8,
		left: 8,
		paddingHorizontal: 8,
		paddingVertical: 2,
		borderRadius: 99,
		zIndex: 2,
	},
	badgeText: { color: "#fff", fontSize: 10, fontWeight: "bold" },
	completion: {
		position: "absolute",
		top: 8,
		right: 8,
		backgroundColor: "rgba(0,0,0,0.7)",
		paddingHorizontal: 8,
		paddingVertical: 2,
		borderRadius: 99,
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
		zIndex: 2,
	},
	price: {
		position: "absolute",
		bottom: 8,
		left: 8,
		paddingHorizontal: 8,
		paddingVertical: 2,
		borderRadius: 4,
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
		zIndex: 2,
	},
	priceText: { color: "#fff", fontSize: 12, fontWeight: "bold" },
	bottom: { padding: 12 },
	developer: { fontSize: 11, marginBottom: 2 },
	name: { fontSize: 14, marginBottom: 2 },
	locationRow: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 8,
		gap: 5,
	},
	location: { fontSize: 12 },
	metricsRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 8,
		gap: 8,
	},
	unitRow: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
	unitType: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 99 },
});
