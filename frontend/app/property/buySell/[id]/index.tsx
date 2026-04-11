import { useEffect, useState } from "react";
import { View, Pressable, ScrollView, Image, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { MOCK_BUYSELL, Property } from "@/mock/buySell";
import { PropertyMap } from "@/components/common/PropertyMap";
import MediaCarousel from "@/components/common/MediaCarousel";
import NotFound from "@/components/common/NotFound";
import {
	BodyText,
	NormalTitle,
	PageTitle,
	SmallTitle,
} from "@/components/atoms/Typography";
import { useTheme } from "@/hooks/useTheme";
import {
	BedDouble,
	Bath,
	Maximize,
	Layers,
	MapPin,
	MessageCircle,
	Coins,
} from "lucide-react-native";
import globalStyles from "@/styles/styles";

export default function BuySellDetails() {
	const { id } = useLocalSearchParams();
	const [property, setProperty] = useState<Property | null>(null);
	const router = useRouter();
	const colors = useTheme();

	useEffect(() => {
		if (!id) return;
		const found = MOCK_BUYSELL.find((p) => p.id?.toString() === id.toString());
		setProperty(found || null);
	}, [id]);

	if (!property) return <NotFound />;

	return (
		<SafeAreaView
			style={[styles.container, { backgroundColor: colors.background }]}
		>
			<ScrollView>
				<MediaCarousel
					cover={property.media.cover}
					images={property.media.images}
					videos={property.media.videos}
					onLike={() => console.log("Like")}
					onShare={() => console.log("Share")}
					showBack={true}
					showLike={true}
					showShare={true}
				/>

				{/* PROPERTY INFO */}
				<View style={styles.section}>
					<PageTitle
						style={{ marginBottom: 0, fontSize: 20, color: colors.textPrimary }}
					>
						฿{property.price.toLocaleString()}
					</PageTitle>

					{/* Row: type pill + NEW red text + uniqueCode right */}
					<View style={styles.infoRow}>
						<View
							style={[
								styles.typePill,
								{ backgroundColor: colors.secondaryMute },
							]}
						>
							<SmallTitle style={{ color: colors.primaryGold }}>
								{property.type}
							</SmallTitle>
						</View>
						{property.isNew && (
							<SmallTitle
								style={{ color: colors.primaryRed, fontWeight: "bold" }}
							>
								NEW
							</SmallTitle>
						)}
						<BodyText
							style={{ color: colors.textSecondary, marginLeft: "auto" }}
						>
							{property.uniqueCode}
						</BodyText>
					</View>

					<NormalTitle style={styles.title}>{property.title}</NormalTitle>

					{/* Address with pin */}
					<View style={styles.locationRow}>
						<MapPin size={14} color={colors.primaryGold} />
						<BodyText style={styles.address}>
							{property.location.address}
						</BodyText>
					</View>

					{/* 4‑column specs */}
					<View style={styles.specsRow}>
						<View style={styles.specColumn}>
							<BedDouble size={20} color={colors.primaryGold} />
							<NormalTitle style={styles.specValue}>
								{property.bedrooms}
							</NormalTitle>
							<BodyText style={styles.specLabel}>Bedrooms</BodyText>
						</View>
						<View style={styles.specColumn}>
							<Bath size={20} color={colors.primaryGold} />
							<NormalTitle style={styles.specValue}>
								{property.bathrooms}
							</NormalTitle>
							<BodyText style={styles.specLabel}>Bathrooms</BodyText>
						</View>
						<View style={styles.specColumn}>
							<Maximize size={20} color={colors.primaryGold} />
							<NormalTitle style={styles.specValue}>
								{property.areaSqm}
							</NormalTitle>
							<BodyText style={styles.specLabel}>Area (m²)</BodyText>
						</View>
						<View style={styles.specColumn}>
							<Layers size={20} color={colors.primaryGold} />
							<NormalTitle style={styles.specValue}>
								{property.floor}
							</NormalTitle>
							<BodyText style={styles.specLabel}>Floor</BodyText>
						</View>
					</View>
				</View>

				{/* FEATURES */}
				{Object.keys(property.features).length > 0 && (
					<View style={styles.section}>
						<NormalTitle style={styles.sectionTitle}>Features</NormalTitle>
						<View style={styles.featuresGrid}>
							{Object.entries(property.features).map(
								([key, val]) =>
									val && (
										<View key={key} style={styles.featureItem}>
											<BodyText>{key}</BodyText>
										</View>
									),
							)}
						</View>
					</View>
				)}

				{/* ABOUT */}
				{property.description && (
					<View style={styles.section}>
						<NormalTitle style={styles.sectionTitle}>About</NormalTitle>
						<BodyText>{property.description}</BodyText>
					</View>
				)}

				{/* MAP */}
				<View style={styles.section}>
					<NormalTitle style={styles.sectionTitle}>Location</NormalTitle>
					<PropertyMap
						markers={[
							{
								id: property.id,
								latitude: property.location.latitude,
								longitude: property.location.longitude,
								title: property.title,
								description: property.location.address,
							},
						]}
						style={{ height: 200 }}
					/>
				</View>

				{/* AGENT BOX */}
				<View style={[styles.agentBox, { backgroundColor: "#fff" }]}>
					<NormalTitle style={styles.sectionTitle}>Property Agent</NormalTitle>
					<View style={styles.agentRow}>
						{property.agent.image && (
							<Image
								source={{ uri: property.agent.image }}
								style={styles.agentImage}
							/>
						)}
						<View style={styles.agentInfo}>
							<NormalTitle style={styles.agentName}>
								{property.agent.name}
							</NormalTitle>
							<BodyText>
								{property.agent.experienceYears} years experience
							</BodyText>
							<BodyText>
								⭐ {property.agent.rating} ({property.agent.reviewCount})
							</BodyText>
						</View>
					</View>
				</View>

				{/* CONSULTATION FEE BOX */}
				<View
					style={[
						styles.feeBox,
						{ backgroundColor: colors.surface, borderColor: colors.border },
					]}
				>
					<NormalTitle style={{ color: colors.primaryGray }}>
						Agent Consultation Fee
					</NormalTitle>
					<PageTitle style={{ color: colors.primaryRed }}>
						{property.agent.consultationFee.toLocaleString()} MMK
					</PageTitle>
					<BodyText
						style={{
							fontSize: 12,
							textAlign: "center",
							color: colors.primaryGreen,
						}}
					>
						✦ Free consultation — Limited Offer
					</BodyText>
				</View>
			</ScrollView>
			{/* CTA BUTTONS */}
			<View style={styles.ctaRow}>
				<Pressable
					style={[
						styles.ctaButton,
						{
							backgroundColor: "#fff",
							borderColor: colors.primaryGray + 50,
							borderWidth: 1,
						},
					]}
					onPress={() =>
						router.push({
							pathname: "/booking/[id]",
							params: {
								id: property.id,
								image: property.media.cover,
								title: property.title,
								location: property.location.address,
								price: property.price,
								isAgent: 1,
								agentName: property.agent.name,
								agentImage: property.agent.image,
							},
						})
					}
				>
					<MessageCircle size={18} color="#000000ff" />
					<BodyText style={{ color: colors.textPrimary }}>
						Consultation
					</BodyText>
				</Pressable>
				<Pressable
					style={[styles.ctaButton, { backgroundColor: colors.primaryGold }]}
				>
					<Coins size={18} color="#fff" />
					<BodyText style={styles.ctaText}>
						Reserve {property.reserveCoins} Coins
					</BodyText>
				</Pressable>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1 },
	section: { marginTop: 24, paddingHorizontal: 16 },
	sectionTitle: { fontWeight: "bold", fontSize: 18, marginBottom: 12 },
	infoRow: {
		flexDirection: "row",
		alignItems: "center",
		flexWrap: "wrap",
		gap: 8,
		marginVertical: 8,
	},
	typePill: {
		paddingHorizontal: 10,
		paddingVertical: 4,
		borderRadius: 20,
		alignSelf: "flex-start",
	},
	title: { marginVertical: 4, lineHeight: 24 },
	locationRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 6,
		marginBottom: 12,
	},
	address: { fontSize: 14, flexShrink: 1 },
	specsRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginVertical: 16,
		gap: 10,
	},
	specColumn: {
		alignItems: "center",
		flex: 1,
		gap: 4,
		backgroundColor: "#fff",
		paddingVertical: 10,
		borderRadius: 10,
		...globalStyles.shadows,
	},
	specValue: { fontSize: 16, fontWeight: "bold" },
	specLabel: { fontSize: 12, color: "#666" },
	featuresGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
	featureItem: { backgroundColor: "#eee", padding: 6, borderRadius: 6 },
	agentBox: {
		marginTop: 24,
		marginHorizontal: 16,
		padding: 16,
		borderRadius: 16,
		...globalStyles.shadows,
	},
	agentRow: { flexDirection: "row", gap: 12, alignItems: "center" },
	agentImage: { width: 60, height: 60, borderRadius: 12 },
	agentInfo: { flex: 1 },
	agentName: { fontWeight: "600", marginBottom: 2 },
	feeBox: {
		marginTop: 16,
		marginHorizontal: 16,
		padding: 20,
		borderRadius: 16,
		borderWidth: 1,
		alignItems: "center",
	},
	consultationFee: { fontSize: 20, fontWeight: "bold", marginVertical: 8 },
	ctaRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 16,
		gap: 12,
		marginTop: 8,
	},
	ctaButton: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 14,
		borderRadius: 15,
		gap: 8,
	},
	ctaText: { color: "#fff", fontWeight: "600", fontSize: 14 },
});
