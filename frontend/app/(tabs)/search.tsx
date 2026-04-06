import { useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	TextInput,
	FlatList,
	StyleSheet,
	ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps"; // react-native-maps
import PropertyCard from "@/components/home/property/PropertyCard";
import { useRouter } from "expo-router";
import { MOCK_BUYSELL } from "@/mock/buySell";

const PURPOSES = [
	"All",
	"For Investment",
	"For Living",
	"For Rent",
	"For Long Stay Visa",
];
const TYPES = ["All", "Condo", "House", "Townhouse", "Penthouse"];
const LOCATIONS = [
	"All",
	"Sukhumvit",
	"Thonglor",
	"Sathorn",
	"Bangna",
	"Rama 9",
	"Pattaya",
];
const PRICES = ["Any", "<฿5M", "฿5-10M", "฿10-20M", "฿20M+"];
const BEDROOMS = ["Any", "1+", "2+", "3+", "4+"];

export default function Search() {
	const router = useRouter();
	const [viewMode, setViewMode] = useState<"list" | "map">("list");
	const [showFilters, setShowFilters] = useState(false);

	return (
		<SafeAreaView style={styles.container}>
			{/* HEADER */}
			<View style={styles.header}>
				<TouchableOpacity onPress={() => router.back()}>
					<Text>{"<"}</Text>
				</TouchableOpacity>

				<TextInput placeholder="Search..." style={styles.searchBar} />

				<TouchableOpacity onPress={() => setShowFilters((prev) => !prev)}>
					<Ionicons name="filter" size={24} color="#333" />
				</TouchableOpacity>
			</View>

			{/* CATEGORY ROW */}
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				style={styles.categoryRow}
			>
				<TouchableOpacity
					style={styles.categoryBtn}
					onPress={() => router.push("/(tabs)/search")}
				>
					<Text
						style={{
							fontSize: 15,
							fontWeight: "500",
						}}
					>
						Buy/Sell
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.categoryBtn}
					onPress={() => router.push("/roomRent/roomRent")}
				>
					<Text
						style={{
							fontSize: 15,
							fontWeight: "500",
						}}
					>
						Room Rent
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.categoryBtn}
					onPress={() => router.push("/ownerDirect/ownerDirect")}
				>
					<Text
						style={{
							fontSize: 15,
							fontWeight: "500",
						}}
					>
						Owner-Direct
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.categoryBtn}
					onPress={() => router.push("/offPlan/offPlan")}
				>
					<Text
						style={{
							fontSize: 15,
							fontWeight: "500",
						}}
					>
						Off-Plan
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.categoryBtn}
					onPress={() => router.push("/business")}
				>
					<Text
						style={{
							fontSize: 15,
							fontWeight: "500",
						}}
					>
						Business
					</Text>
				</TouchableOpacity>
			</ScrollView>

			{/* FILTERS */}
			{showFilters && (
				<View style={styles.filtersContainer}>
					<FilterSection title="Purpose" options={PURPOSES} />
					<FilterSection title="Type" options={TYPES} />
					<FilterSection title="Location" options={LOCATIONS} />
					<FilterSection title="Price" options={PRICES} />
					<FilterSection title="Bedrooms" options={BEDROOMS} />
				</View>
			)}

			{/* TOGGLE + TOTAL */}
			<View style={styles.toggleRowWithCount}>
				{/* Total Properties */}
				<Text style={styles.totalCount}>
					{MOCK_BUYSELL.length} properties found
				</Text>

				{/* List/Map Toggle */}
				<View style={styles.toggleRow}>
					<TouchableOpacity onPress={() => setViewMode("list")}>
						<Text style={viewMode === "list" ? styles.active : undefined}>
							List
						</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => setViewMode("map")}>
						<Text style={viewMode === "map" ? styles.active : undefined}>
							Map
						</Text>
					</TouchableOpacity>
				</View>
			</View>

			{/* CONTENT */}
			{viewMode === "list" ? (
				<FlatList
					data={MOCK_BUYSELL}
					keyExtractor={(item) => item.id!.toString()}
					renderItem={({ item }) => <PropertyCard property={item} />}
				/>
			) : (
				<MapView
					style={styles.map}
					initialRegion={{
						latitude: MOCK_BUYSELL[0].location.latitude || 13.7563, // default Bangkok
						longitude: MOCK_BUYSELL[0].location.longitude || 100.5018,
						latitudeDelta: 0.1,
						longitudeDelta: 0.1,
					}}
				>
					{MOCK_BUYSELL.map((p) =>
						p.location.latitude && p.location.longitude ? (
							<Marker
								key={p.id}
								coordinate={{
									latitude: p.location.latitude,
									longitude: p.location.longitude,
								}}
								title={p.title}
								description={p.location.address}
								onPress={() => router.push(`/buySell/${p.id}`)}
							/>
						) : null,
					)}
				</MapView>
			)}
		</SafeAreaView>
	);
}

/* ---------------- FILTER COMPONENT ---------------- */
function FilterSection({
	title,
	options,
}: {
	title: string;
	options: string[];
}) {
	return (
		<View style={styles.filterSection}>
			<Text style={styles.filterTitle}>{title}</Text>
			<ScrollView horizontal showsHorizontalScrollIndicator={false}>
				{options.map((opt) => (
					<TouchableOpacity key={opt} style={styles.filterBtn}>
						<Text>{opt}</Text>
					</TouchableOpacity>
				))}
			</ScrollView>
		</View>
	);
}

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
	container: { flex: 1 },

	header: {
		flexDirection: "row",
		alignItems: "center",
		padding: 10,
		gap: 8,
	},

	searchBar: {
		flex: 1,
		borderWidth: 1,
		borderRadius: 8,
		paddingHorizontal: 10,
		height: 40,
	},

	filtersContainer: {
		paddingHorizontal: 16,
		paddingBottom: 16,
	},

	filterSection: {
		marginBottom: 12,
	},

	filterTitle: {
		fontWeight: "bold",
		marginBottom: 6,
	},

	filterBtn: {
		backgroundColor: "#eee",
		paddingVertical: 6,
		paddingHorizontal: 12,
		borderRadius: 6,
		marginRight: 8,
	},

	categoryRow: {
		flexGrow: 0,
		flexDirection: "row",
		paddingHorizontal: 16,
		paddingVertical: 10,
		marginBottom: 8,
	},

	categoryBtn: {
		paddingVertical: 6,
		paddingHorizontal: 12,
		backgroundColor: "#eee",
		borderRadius: 6,
		marginRight: 8,
	},

	toggleRowWithCount: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 16,
		paddingVertical: 10,
	},

	totalCount: {
		fontWeight: "bold",
		fontSize: 16,
	},

	toggleRow: {
		flexDirection: "row",
		gap: 20,
	},

	active: {
		fontWeight: "bold",
		textDecorationLine: "underline",
	},

	map: {
		flex: 1,
	},
});
