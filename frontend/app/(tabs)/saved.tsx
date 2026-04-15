import { useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MOCK_SAVED_PROPERTIES } from "@/mock/savedProperties";
import { Heart } from "lucide-react-native";
import BackButton from "@/components/common/navigation/BackButton";
import {
	BodyText,
	NormalTitle,
	PageTitle,
} from "@/components/atoms/Typography";
import { useTheme } from "@/hooks/useTheme";
import SavedPropertyCard from "@/components/saved/SavedPropertyCard";

export default function Saved() {
	const colors = useTheme();
	const [savedProperties, setSavedProperties] = useState(MOCK_SAVED_PROPERTIES);

	const handleDelete = (id: number) => {
		setSavedProperties((prev) => prev.filter((p) => p.id !== id));
	};

	const handleShare = (property: (typeof MOCK_SAVED_PROPERTIES)[0]) => {
		console.log("Share", property.name);
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<View style={styles.leftHeader}>
					<BackButton />
					<PageTitle>Saved Properties</PageTitle>
				</View>
				<BodyText>{savedProperties.length} saved</BodyText>
			</View>

			{savedProperties.length === 0 ? (
				<View style={styles.emptyContainer}>
					<View
						style={[
							styles.iconCircle,
							{ backgroundColor: colors.secondaryGold },
						]}
					>
						<Heart size={48} color="#da9a0fff" />
					</View>
					<NormalTitle>No saved properties yet</NormalTitle>
					<BodyText>
						Tap the heart icon on any property to save it here.
					</BodyText>
				</View>
			) : (
				<FlatList
					data={savedProperties}
					keyExtractor={(item) => item.id!.toString()}
					renderItem={({ item }) => (
						<SavedPropertyCard
							property={item}
							onDelete={() => handleDelete(item.id!)}
							onShare={() => handleShare(item)}
						/>
					)}
					contentContainerStyle={{ paddingBottom: 16 }}
				/>
			)}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: "#fff" },
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: "#ccc",
	},
	leftHeader: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
	},
	emptyContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 32,
	},
	iconCircle: {
		width: 96,
		height: 96,
		borderRadius: 15,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 24,
	},
});
