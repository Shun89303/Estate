import { useTheme } from "@/hooks/useTheme";
import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

export default function FilterSection({
	title,
	options,
	selected,
	onSelect,
}: {
	title?: string;
	options: string[];
	selected: string;
	onSelect: (value: string) => void;
}) {
	const colors = useTheme();
	return (
		<View style={styles.filterSection}>
			{title && <Text style={styles.filterTitle}>{title}</Text>}
			<ScrollView horizontal showsHorizontalScrollIndicator={false}>
				{options.map((opt) => (
					<TouchableOpacity
						key={opt}
						style={[
							styles.filterBtn,
							selected === opt && {
								backgroundColor: colors.primaryGold,
							},
						]}
						onPress={() => onSelect(opt)}
					>
						<Text
							style={selected === opt ? styles.filterTextActive : undefined}
						>
							{opt}
						</Text>
					</TouchableOpacity>
				))}
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
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
	filterTextActive: {
		color: "#fff",
		fontWeight: "500",
	},
});
