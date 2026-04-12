import { useTheme } from "@/hooks/useTheme";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { BodyText, SmallTitle } from "../../atoms/Typography";

export default function FilterSection({
	title,
	options,
	selected,
	onSelect,
	titleColor,
	showsHorizontalScrollIndicator,
	borderRadius = 10,
	inactiveBgColor,
	activeBgColor,
	inactiveTextColor,
	activeTextColor,
	borderWidth = 0,
	inactiveBorderColor,
	activeBorderColor,
}: {
	title?: string;
	options: string[];
	selected: string;
	onSelect: (value: string) => void;
	titleColor?: string;
	showsHorizontalScrollIndicator?: boolean;
	borderRadius?: number;
	inactiveBgColor?: string;
	activeBgColor?: string;
	inactiveTextColor?: string;
	activeTextColor?: string;
	borderWidth?: number;
	inactiveBorderColor?: string;
	activeBorderColor?: string;
}) {
	const colors = useTheme();
	const defaultInactiveBg = colors.primaryGray + "20";
	const defaultActiveBg = colors.primaryGold;
	const defaultInactiveText = "black";
	const defaultActiveText = "#fff";

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
				showsHorizontalScrollIndicator={showsHorizontalScrollIndicator ?? false}
			>
				{options.map((opt) => (
					<TouchableOpacity
						key={opt}
						style={[
							styles.filterBtn,
							{
								backgroundColor:
									selected === opt
										? (activeBgColor ?? defaultActiveBg)
										: (inactiveBgColor ?? defaultInactiveBg),
								borderRadius,
								borderWidth,
								borderColor:
									selected === opt
										? (activeBorderColor ?? (borderWidth ? "#ccc" : undefined))
										: (inactiveBorderColor ??
											(borderWidth ? "#ccc" : undefined)),
							},
						]}
						onPress={() => onSelect(opt)}
					>
						<BodyText
							style={[
								selected === opt
									? { color: activeTextColor ?? defaultActiveText }
									: { color: inactiveTextColor ?? defaultInactiveText },
							]}
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
		marginRight: 8,
	},
});
