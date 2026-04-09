import { useTheme } from "@/hooks/useTheme";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { BodyText, SmallTitle } from "../atoms/Typography";

export default function FilterSection({
	title,
	options,
	selected,
	onSelect,
	titleColor,
	showsHorizontalScrollIndicator,
}: {
	title?: string;
	options: string[];
	selected: string;
	onSelect: (value: string) => void;
	titleColor?: string;
	showsHorizontalScrollIndicator?: boolean;
}) {
	const colors = useTheme();
	return (
		<View style={styles.filterSection}>
			{title && (
				<SmallTitle
					style={{
						fontWeight: "bold",
						marginBottom: 6,
						color: titleColor ? titleColor : colors.primaryGray,
						textTransform: "uppercase",
					}}
				>
					{title}
				</SmallTitle>
			)}
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={
					showsHorizontalScrollIndicator
						? showsHorizontalScrollIndicator
						: false
				}
			>
				{options.map((opt) => (
					<TouchableOpacity
						key={opt}
						style={[
							styles.filterBtn,
							{ backgroundColor: colors.primaryGray + 20 },
							selected === opt && {
								backgroundColor: colors.primaryGold,
							},
						]}
						onPress={() => onSelect(opt)}
					>
						<BodyText
							style={
								selected === opt ? styles.filterTextActive : { color: "black" }
							}
						>
							{opt}
						</BodyText>
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
	filterBtn: {
		paddingVertical: 6,
		paddingHorizontal: 12,
		borderRadius: 10,
		marginRight: 8,
	},
	filterTextActive: {
		color: "#fff",
		fontWeight: "500",
	},
});
