import { useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	FlatList,
	StyleSheet,
	Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { MOCK_CONSULTATIONS } from "@/mock/consultations";
import { MOCK_RESERVES } from "@/mock/reserves";

export default function Bookings() {
	const router = useRouter();
	const [viewMode, setViewMode] = useState<"Consultations" | "Reserves">(
		"Consultations",
	);

	return (
		<SafeAreaView style={styles.container}>
			{/* HEADER */}
			<View style={styles.header}>
				<TouchableOpacity onPress={() => router.back()}>
					<Text>{"<"}</Text>
				</TouchableOpacity>
				<Text style={styles.title}>Bookings</Text>
				<Text style={{ width: 24 }} />
			</View>

			{/* TOGGLE */}
			<View style={styles.toggleRow}>
				<TouchableOpacity onPress={() => setViewMode("Consultations")}>
					<Text
						style={viewMode === "Consultations" ? styles.active : undefined}
					>
						Consultations
					</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => setViewMode("Reserves")}>
					<Text style={viewMode === "Reserves" ? styles.active : undefined}>
						Reserves
					</Text>
				</TouchableOpacity>
			</View>

			{/* CONTENT */}
			{viewMode === "Consultations" ? (
				<FlatList
					data={MOCK_CONSULTATIONS}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item }) => (
						<TouchableOpacity
							onPress={() => router.push(`/consultation/${item.id}`)}
						>
							<View style={styles.consultCard}>
								<Image source={{ uri: item.image }} style={styles.cardImage} />
								<View style={styles.cardInfo}>
									<View style={styles.cardHeader}>
										<View style={{ flex: 1 }}>
											<Text
												style={styles.cardTitle}
												numberOfLines={1}
												ellipsizeMode="tail"
											>
												{item.title}
											</Text>
											<Text
												style={styles.cardSub}
											>{`Agent: ${item.agent}`}</Text>
										</View>
										<Text style={styles.statusBadge}>{item.status}</Text>
									</View>

									{/* Date, Time, Method row */}
									<View style={styles.cardSubRow}>
										<Text>{item.date}</Text>
										<Text>{item.time}</Text>
										<Text>{item.method}</Text>
									</View>
								</View>

								{/* Chevron stays on the far right */}
								<Ionicons
									name="chevron-forward"
									size={24}
									color="#333"
									style={styles.chevronIcon}
								/>
							</View>
						</TouchableOpacity>
					)}
				/>
			) : (
				<FlatList
					data={MOCK_RESERVES}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item }) => (
						<TouchableOpacity
							onPress={() => router.push(`/reservation/${item.id}`)}
						>
							<View style={styles.reserveCard}>
								<Image source={{ uri: item.image }} style={styles.cardImage} />

								<View style={styles.cardInfo}>
									{/* Top row: title + location, status badge */}
									<View style={styles.cardHeader}>
										<View style={{ flex: 1 }}>
											<Text
												style={styles.cardTitle}
												numberOfLines={1}
												ellipsizeMode="tail"
											>
												{item.title}
											</Text>
											<Text
												style={styles.cardSub}
												numberOfLines={1}
												ellipsizeMode="tail"
											>
												{item.location}
											</Text>
										</View>
										<Text style={styles.statusBadge}>{item.status}</Text>
									</View>

									{/* Bottom row: price left, coins right */}
									<View style={styles.cardBottomRow}>
										<Text style={styles.price}>
											฿{item.price.toLocaleString()}
										</Text>
										<Text style={styles.coins}>{item.coins} coins</Text>
									</View>
								</View>

								{/* Chevron stays on the far right */}
								<Ionicons
									name="chevron-forward"
									size={24}
									color="#333"
									style={styles.chevronIcon}
								/>
							</View>
						</TouchableOpacity>
					)}
				/>
			)}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1 },

	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: "#ccc",
	},

	title: { fontSize: 18, fontWeight: "bold" },

	toggleRow: {
		flexDirection: "row",
		justifyContent: "center",
		gap: 20,
		paddingVertical: 10,
	},

	active: {
		fontWeight: "bold",
		textDecorationLine: "underline",
	},

	reserveCard: {
		flexDirection: "row",
		padding: 12,
		borderBottomWidth: 1,
		borderBottomColor: "#eee",
		alignItems: "center", // vertically center everything
	},

	cardBottomRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 6,
	},

	cardRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},

	consultCard: {
		flexDirection: "row",
		padding: 12,
		borderBottomWidth: 1,
		borderBottomColor: "#eee",
		alignItems: "center", // vertically center everything
	},

	cardInfo: { flex: 1, justifyContent: "space-between" },

	cardHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 4,
	},

	cardTitle: { fontWeight: "bold", fontSize: 16 },

	cardSub: { color: "#666" },

	statusBadge: {
		backgroundColor: "#eee",
		paddingHorizontal: 8,
		paddingVertical: 2,
		borderRadius: 12,
		fontSize: 12,
	},

	cardImage: {
		width: 60,
		height: 60,
		borderRadius: 8,
		marginRight: 12,
	},

	cardSubRow: {
		flexDirection: "row",
		gap: 12,
	},

	chevronIcon: {
		marginLeft: 12,
		alignSelf: "center",
	},

	coins: { color: "#666" },

	price: { fontWeight: "bold" },
});
