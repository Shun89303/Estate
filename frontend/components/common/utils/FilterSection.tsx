import {
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	View,
	TextStyle,
} from "react-native";
import BodyText from "@/components/common/typography/BodyText";
import { lightColors } from "@/theme/light";
import { spacing, scaleSize } from "@/utils/metrics";

interface FilterSectionProps {
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
}

export default function FilterSection({
	title,
	options,
	selected,
	onSelect,
	titleColor,
	showsHorizontalScrollIndicator = false,
	borderRadius = scaleSize(10),
	inactiveBgColor,
	activeBgColor,
	inactiveTextColor,
	activeTextColor,
	borderWidth = 0,
	inactiveBorderColor,
	activeBorderColor,
}: FilterSectionProps) {
	const defaultInactiveBg = lightColors.mutedBackground;
	const defaultActiveBg = lightColors.brand;
	const defaultInactiveText = lightColors.bigTitleText;
	const defaultActiveText = lightColors.background;

	// Compute title style to avoid array type issues
	const titleStyle: TextStyle = {
		marginBottom: scaleSize(6),
		textTransform: "uppercase",
		color: titleColor || lightColors.bodyText,
	};

	return (
		<View style={styles.filterSection}>
			{title && (
				<BodyText variant="large" style={titleStyle}>
					{title}
				</BodyText>
			)}
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
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
								borderRadius: borderRadius,
								borderWidth: scaleSize(borderWidth),
								borderColor:
									selected === opt
										? (activeBorderColor ??
											(borderWidth ? lightColors.border : undefined))
										: (inactiveBorderColor ??
											(borderWidth ? lightColors.border : undefined)),
							},
						]}
						onPress={() => onSelect(opt)}
					>
						<BodyText
							style={{
								color:
									selected === opt
										? (activeTextColor ?? defaultActiveText)
										: (inactiveTextColor ?? defaultInactiveText),
								marginBottom: 0,
							}}
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
		marginBottom: spacing.md,
	},
	filterBtn: {
		paddingVertical: scaleSize(6),
		paddingHorizontal: spacing.sm,
		marginRight: spacing.sm,
	},
});
