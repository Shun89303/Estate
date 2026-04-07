import React, { useState, useMemo } from "react";
import {
	View,
	Text,
	Pressable,
	FlatList,
	Image,
	TextInput,
	ScrollView,
	TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import MapView, { Marker } from "react-native-maps";
import { BusinessPropertyType, MOCK_BUSINESS } from "@/mock/business";

const LOCATIONS = [
	"All",
	"Silom",
	"Ekkamai",
	"Chatuchak",
	"Bangna",
	"Ari",
	"Ratchada",
];
const PRICE_RANGES = ["All", "<฿10K", "฿10-25K", "฿25-50K", "฿50K+"];
const TYPE_FILTERS: BusinessPropertyType[] = [
	"OFFICE",
	"CO_WORKING",
	"SHOP_RETAIL",
	"WAREHOUSE",
	"RESTAURANT",
	"EVENT_VENUE",
];

export default function Business() {
	const router = useRouter();
	const [showFilters, setShowFilters] = useState(false);
	const [viewMode, setViewMode] = useState<"LIST" | "MAP">("LIST");

	// Filter states
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedLocation, setSelectedLocation] = useState("All");
	const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(
		"All",
	);
	const [selectedType, setSelectedType] = useState<string>("All");

	// Helper: check if price matches selected range
	const matchesPriceRange = (price: number): boolean => {
		if (selectedPriceRange === "All" || !selectedPriceRange) return true;
		switch (selectedPriceRange) {
			case "<฿10K":
				return price < 10000;
			case "฿10-25K":
				return price >= 10000 && price <= 25000;
			case "฿25-50K":
				return price >= 25000 && price <= 50000;
			case "฿50K+":
				return price > 50000;
			default:
				return true;
		}
	};

	// Filtered data based on all criteria
	const filteredData = useMemo(() => {
		return MOCK_BUSINESS.filter((item) => {
			// Search filter (title or address)
			const matchesSearch =
				searchQuery === "" ||
				item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				item.location.address.toLowerCase().includes(searchQuery.toLowerCase());

			// Location filter
			const matchesLocation =
				selectedLocation === "All" ||
				item.location.address.includes(selectedLocation);

			// Price filter (using monthly amount – adjust if needed for daily)
			const matchesPrice = matchesPriceRange(item.pricing.amount);

			// Type filter
			const matchesType = selectedType === "All" || item.type === selectedType;

			return matchesSearch && matchesLocation && matchesPrice && matchesType;
		});
	}, [searchQuery, selectedLocation, selectedPriceRange, selectedType]);

	return (
		<SafeAreaView style={{ flex: 1, padding: 12 }}>
			{/* Header */}
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<Pressable onPress={() => router.back()}>
					<Text style={{ fontSize: 14, fontWeight: "500" }}>Back</Text>
				</Pressable>
				<Text style={{ fontSize: 16, fontWeight: "600" }}>Business Spaces</Text>
				<Pressable onPress={() => setShowFilters(!showFilters)}>
					<Text style={{ fontSize: 14, fontWeight: "500" }}>Filter</Text>
				</Pressable>
			</View>

			{/* Search bar */}
			<TextInput
				placeholder="Search spaces"
				value={searchQuery}
				onChangeText={setSearchQuery}
				style={{
					borderWidth: 1,
					borderColor: "#ccc",
					borderRadius: 8,
					marginTop: 8,
					paddingHorizontal: 12,
					height: 40,
				}}
			/>

			{/* Expanded Filters (Location + Price) */}
			{showFilters && (
				<View
					style={{
						marginTop: 8,
						paddingVertical: 8,
						borderWidth: 1,
						borderColor: "#eee",
						borderRadius: 8,
						paddingHorizontal: 8,
					}}
				>
					<Text style={{ marginBottom: 4 }}>Location:</Text>
					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
						style={{ marginBottom: 8 }}
					>
						{LOCATIONS.map((loc) => (
							<TouchableOpacity
								key={loc}
								onPress={() => setSelectedLocation(loc)}
								style={{
									padding: 6,
									backgroundColor:
										selectedLocation === loc ? "#2c6e9e" : "#ddd",
									marginRight: 6,
									borderRadius: 6,
								}}
							>
								<Text
									style={{ color: selectedLocation === loc ? "#fff" : "#000" }}
								>
									{loc}
								</Text>
							</TouchableOpacity>
						))}
					</ScrollView>

					<Text style={{ marginBottom: 4 }}>Price range:</Text>
					<ScrollView horizontal showsHorizontalScrollIndicator={false}>
						{PRICE_RANGES.map((price) => (
							<TouchableOpacity
								key={price}
								onPress={() => setSelectedPriceRange(price)}
								style={{
									padding: 6,
									backgroundColor:
										selectedPriceRange === price ? "#2c6e9e" : "#ddd",
									marginRight: 6,
									borderRadius: 6,
								}}
							>
								<Text
									style={{
										color: selectedPriceRange === price ? "#fff" : "#000",
									}}
								>
									{price}
								</Text>
							</TouchableOpacity>
						))}
					</ScrollView>
				</View>
			)}

			{/* Type Filters (always visible) */}
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				style={{ marginTop: 8, flexGrow: 0 }}
			>
				{["All", ...TYPE_FILTERS].map((type) => (
					<TouchableOpacity
						key={type}
						onPress={() => setSelectedType(type)}
						style={{
							padding: 6,
							backgroundColor: selectedType === type ? "#2c6e9e" : "#ddd",
							marginRight: 6,
							borderRadius: 6,
						}}
					>
						<Text style={{ color: selectedType === type ? "#fff" : "#000" }}>
							{type.replace("_", " ")}
						</Text>
					</TouchableOpacity>
				))}
			</ScrollView>

			{/* Total spaces found + View toggle */}
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
					marginVertical: 8,
				}}
			>
				<Text>{filteredData.length} spaces found</Text>
				<View style={{ flexDirection: "row" }}>
					<Pressable
						onPress={() => setViewMode("LIST")}
						style={{ marginRight: 8 }}
					>
						<Text style={{ fontWeight: viewMode === "LIST" ? "700" : "400" }}>
							List
						</Text>
					</Pressable>
					<Pressable onPress={() => setViewMode("MAP")}>
						<Text style={{ fontWeight: viewMode === "MAP" ? "700" : "400" }}>
							Map
						</Text>
					</Pressable>
				</View>
			</View>

			{/* List or Map View (using filtered data) */}
			{viewMode === "LIST" ? (
				<FlatList
					data={filteredData}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item }) => (
						<Pressable onPress={() => router.push(`/business/${item.id}`)}>
							<View
								style={{
									flexDirection: "row",
									marginBottom: 12,
									borderWidth: 1,
									borderColor: "#eee",
									borderRadius: 8,
								}}
							>
								<View style={{ width: 100, height: 100, position: "relative" }}>
									<Image
										source={{ uri: item.media.cover }}
										style={{ width: "100%", height: "100%", borderRadius: 8 }}
									/>
									<View
										style={{
											position: "absolute",
											top: 6,
											left: 6,
											backgroundColor: "#000000aa",
											paddingHorizontal: 4,
											borderRadius: 4,
											flexDirection: "row",
											alignItems: "center",
										}}
									>
										<Text style={{ color: "#fff", fontSize: 10 }}>
											{item.type.replace("_", " ")}
										</Text>
									</View>
								</View>

								<View
									style={{
										flex: 1,
										padding: 8,
										justifyContent: "space-between",
									}}
								>
									<Text style={{ fontWeight: "600" }}>{item.title}</Text>
									<Text>{item.location.address}</Text>
									<Text>
										{item.areaSqm} sqm • {item.capacity} people
									</Text>
									<View
										style={{
											flexDirection: "row",
											justifyContent: "space-between",
										}}
									>
										<Text>{item.minLeaseMonths} mo</Text>
										<Text>
											฿{item.pricing.amount}/
											{item.pricing.type === "MONTHLY" ? "mo" : "day"}
										</Text>
									</View>
								</View>
							</View>
						</Pressable>
					)}
					ListEmptyComponent={
						<Text style={{ textAlign: "center", marginTop: 20 }}>
							No spaces match your filters.
						</Text>
					}
				/>
			) : (
				<MapView
					style={{ flex: 1 }}
					initialRegion={{
						latitude: 13.736,
						longitude: 100.568,
						latitudeDelta: 0.1,
						longitudeDelta: 0.1,
					}}
				>
					{filteredData.map((item) => (
						<Marker
							key={item.id}
							coordinate={{
								latitude: item.location.latitude,
								longitude: item.location.longitude,
							}}
							title={item.title}
							description={`${item.type.replace("_", " ")} • ฿${item.pricing.amount}`}
							onPress={() => router.push(`/business/${item.id}`)}
						/>
					))}
				</MapView>
			)}
		</SafeAreaView>
	);
}
