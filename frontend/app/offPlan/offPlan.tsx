import { useRouter } from "expo-router";
import {
	View,
	Text,
	Pressable,
	Image,
	FlatList,
	StyleSheet,
	TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MOCK_OFFPLAN, OffPlanProperty } from "@/mock/offPlan";
import { Ionicons } from "@expo/vector-icons";

function Metric({
	icon,
	value,
	label,
}: {
	icon: any;
	value: string;
	label: string;
}) {
	return (
		<View style={styles.metric}>
			<Ionicons name={icon} size={16} />
			<Text style={styles.metricValue}>{value}</Text>
			<Text style={styles.metricLabel}>{label}</Text>
		</View>
	);
}

function OffPlanCard({ property }: { property: OffPlanProperty }) {
	const router = useRouter();

	return (
		<TouchableOpacity
			style={styles.card}
			activeOpacity={0.8}
			onPress={() => router.push(`/offPlan/${property.id}`)}
		>
			{/* UPPER */}
			<View style={styles.imageContainer}>
				<Image source={{ uri: property.media.cover }} style={styles.image} />

				{/* BADGES */}
				<Text style={styles.badge}>OFF-PLAN</Text>
				<Text style={styles.completion}>{property.completionDate}</Text>
				<Text style={styles.price}>{property.priceRange}</Text>
			</View>

			{/* BOTTOM */}
			<View style={styles.bottom}>
				{/* TOP */}
				<Text style={styles.developer}>{property.developer.name}</Text>
				<Text style={styles.name}>{property.title}</Text>
				<Text style={styles.location}>{property.locationAddress}</Text>

				{/* MIDDLE */}
				<View style={styles.metricsRow}>
					<Metric
						icon="trending-up"
						value={property.rentalYield}
						label="Rental Yield"
					/>
					<Metric
						icon="stats-chart"
						value={property.annualGrowth}
						label="Est. Growth"
					/>
					<Metric
						icon="home"
						value={property.unitsLeft.toString()}
						label="Available"
					/>
				</View>

				{/* BOTTOM */}
				<View style={styles.unitRow}>
					{property.units.map((u, idx) => (
						<Text key={idx} style={styles.unitType}>
							{u.type}
						</Text>
					))}
				</View>
			</View>
		</TouchableOpacity>
	);
}

export default function OffPlan() {
	const router = useRouter();

	return (
		<SafeAreaView style={styles.container}>
			{/* HEADER */}
			<View style={styles.header}>
				<Pressable onPress={() => router.back()}>
					<Text>Back</Text>
				</Pressable>
			</View>

			{/* TITLE */}
			<View style={styles.titleContainer}>
				<Text style={styles.title}>Off-Plan Projects</Text>
				<Text style={styles.subtitle}>
					Pre-construction investments with AI insights
				</Text>
			</View>

			{/* LIST */}
			<FlatList
				data={MOCK_OFFPLAN}
				showsVerticalScrollIndicator={false}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) => <OffPlanCard property={item} />}
				contentContainerStyle={{ padding: 16 }}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: "#fff" },

	header: {
		padding: 16,
	},

	titleContainer: {
		paddingHorizontal: 16,
		marginBottom: 12,
	},
	title: { fontSize: 18, fontWeight: "bold" },
	subtitle: { fontSize: 12, color: "#666" },

	card: {
		marginBottom: 16,
		backgroundColor: "#fff",
		borderRadius: 12,
		overflow: "hidden",
		elevation: 2,
	},

	/* UPPER */
	imageContainer: {
		position: "relative",
	},
	image: {
		width: "100%",
		height: 180,
	},

	badge: {
		position: "absolute",
		top: 8,
		left: 8,
		backgroundColor: "#000",
		color: "#fff",
		paddingHorizontal: 6,
		fontSize: 10,
	},

	completion: {
		position: "absolute",
		top: 8,
		right: 8,
		backgroundColor: "#fff",
		paddingHorizontal: 6,
		fontSize: 10,
	},

	price: {
		position: "absolute",
		bottom: 8,
		left: 8,
		backgroundColor: "#000",
		color: "#fff",
		paddingHorizontal: 6,
		fontSize: 12,
	},

	/* BOTTOM */
	bottom: {
		padding: 12,
	},

	developer: {
		fontSize: 11,
		color: "#666",
	},
	name: {
		fontSize: 14,
		fontWeight: "bold",
	},
	location: {
		fontSize: 12,
		color: "#777",
		marginBottom: 8,
	},

	/* MIDDLE */
	metricsRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 8,
	},
	metric: {
		alignItems: "center",
		flex: 1,
	},
	metricValue: {
		fontWeight: "bold",
		fontSize: 12,
	},
	metricLabel: {
		fontSize: 10,
		color: "#666",
	},

	/* BOTTOM */
	unitRow: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 6,
	},
	unitType: {
		backgroundColor: "#eee",
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 6,
		fontSize: 10,
	},
});
