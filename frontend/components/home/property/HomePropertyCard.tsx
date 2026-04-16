import { useRouter } from "expo-router";
import { TouchableOpacity, View, Image, StyleSheet } from "react-native";
import { BedDouble, Bath, Maximize, MapPin } from "lucide-react-native";
import { Property } from "@/mock/buySell";
import { spacing, scaleSize, moderateScale } from "@/utils/metrics";
import Badge from "@/components/common/utils/Badge";
import { lightColors } from "@/theme/light";
import Title from "@/components/common/typography/Title";
import BodyText from "@/components/common/typography/BodyText";

export default function HomePropertyCard({ property }: { property: Property }) {
	const router = useRouter();

	return (
		<TouchableOpacity
			onPress={() => router.push(`/property/buySell/${property.uniqueCode}`)}
			activeOpacity={0.8}
			style={styles.cardContainer}
		>
			<View style={styles.upperSide}>
				<Image
					source={{ uri: property.media.cover }}
					style={styles.coverImage}
				/>
				<View style={styles.overlay} />

				{property.isNew && (
					<Badge
						label="NEW"
						backgroundColor={lightColors.brand}
						style={styles.newBadge}
					/>
				)}

				<View style={styles.priceContainer}>
					<Title
						variant="page"
						style={{
							color: lightColors.background,
							marginBottom: 0,
						}}
					>
						฿{property.price.toLocaleString()}
					</Title>
				</View>
			</View>

			<View style={styles.bottomSide}>
				<Title variant="small">{property.title}</Title>
				<View style={styles.locationRow}>
					<MapPin size={moderateScale(14)} color={lightColors.brand} />
					<BodyText variant="normal" style={styles.locationText}>
						{property.location.address}
					</BodyText>
				</View>
				<View style={styles.divider} />
				<View style={styles.specsRow}>
					<View style={styles.specItem}>
						<BedDouble size={moderateScale(14)} color={lightColors.bodyText} />
						<BodyText variant="small" style={{ marginBottom: 0 }}>
							{property.bedrooms} bed
						</BodyText>
					</View>
					<View style={styles.specItem}>
						<Bath size={moderateScale(14)} color={lightColors.bodyText} />
						<BodyText variant="small" style={{ marginBottom: 0 }}>
							{property.bathrooms} bath
						</BodyText>
					</View>
					<View style={styles.specItem}>
						<Maximize size={moderateScale(14)} color={lightColors.bodyText} />
						<BodyText variant="small" style={{ marginBottom: 0 }}>
							{property.areaSqm} sqm
						</BodyText>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	cardContainer: {
		backgroundColor: lightColors.background,
		borderRadius: scaleSize(12),
		marginBottom: spacing.md,
		overflow: "hidden",
	},
	upperSide: {
		position: "relative",
		height: scaleSize(180),
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
		backgroundColor: "rgba(0,0,0,0.25)",
	},
	newBadge: {
		position: "absolute",
		top: scaleSize(10),
		left: scaleSize(10),
		zIndex: 1,
	},
	priceContainer: {
		position: "absolute",
		bottom: 0,
		left: 0,
		paddingHorizontal: spacing.sm,
		paddingVertical: scaleSize(4),
		zIndex: 1,
	},
	bottomSide: {
		padding: spacing.md,
	},
	locationRow: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: scaleSize(4),
	},
	locationText: {
		marginLeft: scaleSize(6),
		marginBottom: 0,
	},
	divider: {
		height: scaleSize(1),
		backgroundColor: lightColors.mutedBackground,
		marginVertical: spacing.sm,
	},
	specsRow: {
		flexDirection: "row",
		justifyContent: "flex-start",
		gap: spacing.md,
	},
	specItem: {
		flexDirection: "row",
		alignItems: "center",
		gap: scaleSize(4),
	},
});
