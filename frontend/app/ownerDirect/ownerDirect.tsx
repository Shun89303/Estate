import { useRouter } from "expo-router";
import {
	View,
	Text,
	Pressable,
	Image,
	ScrollView,
	StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { MOCK_OWNERDIRECT, Property } from "@/mock/ownerDirect";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useRef, useMemo, useState } from "react";

export default function OwnerDirect() {
	const router = useRouter();

	const [selectedProperty, setSelectedProperty] = useState<Property | null>(
		null,
	);
	const [unlockedIds, setUnlockedIds] = useState<number[]>([]);
	const bottomSheetRef = useRef<BottomSheet>(null);

	const snapPoints = useMemo(() => ["40%"], []);

	const handleCardPress = (item: Property) => {
		const isUnlocked = unlockedIds.includes(item.id);

		if (isUnlocked) {
			router.push(`/ownerDirect/${item.id}`); // adjust route
		} else {
			setSelectedProperty(item);
			bottomSheetRef.current?.expand();
		}
	};

	const handleUnlock = () => {
		if (!selectedProperty) return;

		setUnlockedIds((prev) => [...prev, selectedProperty.id]);
		bottomSheetRef.current?.close();
	};

	return (
		<SafeAreaView style={{ flex: 1 }}>
			{/* HEADER */}
			<View style={styles.header}>
				<Pressable onPress={() => router.back()}>
					<Ionicons name="arrow-back" size={22} />
				</Pressable>

				<Text style={styles.title}>Owner Direct</Text>

				<View style={styles.coins}>
					<Text>🪙</Text>
					<Text style={{ marginLeft: 4 }}>20</Text>
				</View>
			</View>

			<ScrollView contentContainerStyle={{ padding: 16 }}>
				{/* INFO BOX */}
				<View style={styles.infoBox}>
					<Ionicons name="sparkles" size={18} />
					<View style={{ flex: 1 }}>
						<Text style={styles.infoTitle}>For Agents Only</Text>
						<Text style={styles.infoText}>
							Unlock owner contact info using coins. No commission sharing —
							deal directly with owners.
						</Text>
					</View>
				</View>

				{/* LIST */}
				{MOCK_OWNERDIRECT.map((item) => {
					const isUnlocked = unlockedIds.includes(item.id);

					return (
						<Pressable
							key={item.id}
							style={styles.card}
							onPress={() => handleCardPress(item)}
						>
							{/* LEFT IMAGE */}
							<View style={styles.imageWrapper}>
								<Image
									source={{ uri: item.media.cover }}
									style={styles.image}
								/>
								<View style={styles.badge}>
									<Text style={styles.badgeText}>OWNER</Text>
								</View>
							</View>

							{/* RIGHT CONTENT */}
							<View style={styles.content}>
								<Text style={styles.type}>{item.type}</Text>
								<Text style={styles.cardTitle}>{item.title}</Text>
								<Text style={styles.location}>{item.location.address}</Text>

								<Text style={styles.specs}>
									{item.bedrooms} bd • {item.bathrooms} ba • {item.areaSqm} sqm
								</Text>

								{/* BOTTOM ROW */}
								<View style={styles.bottomRow}>
									<View style={styles.unlockRow}>
										<Ionicons
											name={isUnlocked ? "lock-open" : "lock-closed"}
											size={14}
										/>

										{isUnlocked ? (
											<Text style={{ marginLeft: 6 }}>{item.owner.phone}</Text>
										) : (
											<>
												<Text>🪙</Text>
												<Text style={{ marginLeft: 4 }}>
													{item.unlockCoins}
												</Text>
											</>
										)}
									</View>

									<Text style={styles.price}>
										฿{item.price.toLocaleString()}
									</Text>
								</View>
							</View>
						</Pressable>
					);
				})}
			</ScrollView>
			<BottomSheet
				ref={bottomSheetRef}
				index={-1}
				snapPoints={snapPoints}
				enablePanDownToClose
			>
				{selectedProperty && (
					<BottomSheetView style={styles.sheetContent}>
						<Ionicons name="lock-closed" size={24} />

						<Text style={styles.sheetTitle}>Unlock Owner Info</Text>
						<Text style={styles.sheetSubtitle}>{selectedProperty.title}</Text>

						{/* OWNER INFO BOX */}
						<View style={styles.sheetBox}>
							<View>
								<Text>Owner Name</Text>
								<Text>Phone Number</Text>
							</View>

							<View style={{ alignItems: "flex-end" }}>
								<View style={styles.hiddenRow}>
									<Ionicons name="eye-off" size={14} />
									<Text style={{ marginLeft: 4 }}>Hidden</Text>
								</View>
								<View style={styles.hiddenRow}>
									<Ionicons name="eye-off" size={14} />
									<Text style={{ marginLeft: 4 }}>Hidden</Text>
								</View>
							</View>
						</View>

						{/* COST BOX */}
						<View style={styles.sheetBox}>
							<View>
								<Text>Cost</Text>
								<Text>Your Balance</Text>
							</View>

							<View style={{ alignItems: "flex-end" }}>
								<Text>{selectedProperty.unlockCoins} Coins</Text>
								<Text>15 coins</Text>
							</View>
						</View>

						{/* BUTTON */}
						<Pressable style={styles.unlockBtn} onPress={handleUnlock}>
							<Ionicons name="lock-open" size={16} />
							<Text style={{ marginLeft: 6 }}>
								Unlock for {selectedProperty.unlockCoins} Coins
							</Text>
						</Pressable>
					</BottomSheetView>
				)}
			</BottomSheet>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		padding: 16,
	},
	title: {
		fontSize: 16,
		fontWeight: "600",
	},
	coins: {
		flexDirection: "row",
		alignItems: "center",
	},

	infoBox: {
		flexDirection: "row",
		gap: 8,
		backgroundColor: "#f1f1f1",
		padding: 12,
		borderRadius: 10,
		marginBottom: 16,
	},
	infoTitle: {
		fontWeight: "600",
		marginBottom: 4,
	},
	infoText: {
		fontSize: 12,
		color: "#666",
	},

	card: {
		flexDirection: "row",
		marginBottom: 16,
	},

	imageWrapper: {
		position: "relative",
	},
	image: {
		width: 100,
		height: 100,
		borderRadius: 8,
	},
	badge: {
		position: "absolute",
		top: 6,
		left: 6,
		backgroundColor: "black",
		paddingHorizontal: 6,
		paddingVertical: 2,
		borderRadius: 4,
	},
	badgeText: {
		color: "#fff",
		fontSize: 10,
	},

	content: {
		flex: 1,
		marginLeft: 12,
	},

	type: {
		fontSize: 10,
		color: "#777",
		marginBottom: 2,
	},
	cardTitle: {
		fontWeight: "600",
		marginBottom: 2,
	},
	location: {
		fontSize: 12,
		color: "#666",
		marginBottom: 4,
	},
	specs: {
		fontSize: 12,
		color: "#444",
		marginBottom: 6,
	},

	bottomRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},

	unlockRow: {
		flexDirection: "row",
		alignItems: "center",
	},

	price: {
		fontWeight: "600",
	},
	sheetContent: {
		padding: 16,
		gap: 12,
	},

	sheetTitle: {
		fontWeight: "600",
		fontSize: 16,
	},

	sheetSubtitle: {
		fontSize: 12,
		color: "#666",
	},

	sheetBox: {
		flexDirection: "row",
		justifyContent: "space-between",
		backgroundColor: "#f1f1f1",
		padding: 12,
		borderRadius: 10,
	},

	hiddenRow: {
		flexDirection: "row",
		alignItems: "center",
	},

	unlockBtn: {
		marginTop: 8,
		padding: 12,
		backgroundColor: "#ddd",
		borderRadius: 8,
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "center",
	},
});
