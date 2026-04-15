import { View, Image, StyleSheet, ViewStyle } from "react-native";
import Title from "@/components/common/typography/Title";
import BodyText from "@/components/common/typography/BodyText";
import { spacing, scaleSize } from "@/utils/metrics";
import { lightColors } from "@/theme/light";
import globalStyles from "@/styles/styles";

interface OwnerContactProps {
	name: string;
	phone: string;
	profileImage: string;
	containerStyle?: ViewStyle;
	imageSize?: number;
	imageBorderRadius?: number;
	titleVariant?: "page" | "normal" | "small";
	bodyVariant?: "small" | "normal" | "large";
}

export default function OwnerContact({
	name,
	phone,
	profileImage,
	containerStyle,
	imageSize = 50,
	imageBorderRadius = 15,
	titleVariant = "small",
	bodyVariant = "small",
}: OwnerContactProps) {
	return (
		<View style={[styles.container, containerStyle]}>
			<Image
				source={{ uri: profileImage }}
				style={[
					styles.avatar,
					{
						width: scaleSize(imageSize),
						height: scaleSize(imageSize),
						borderRadius: scaleSize(imageBorderRadius),
					},
				]}
			/>
			<View style={styles.info}>
				<Title variant={titleVariant} style={styles.name}>
					{name}
				</Title>
				<BodyText variant={bodyVariant} style={styles.phone}>
					{phone}
				</BodyText>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: lightColors.background,
		borderRadius: scaleSize(12),
		padding: spacing.md,
		gap: spacing.md,
		...globalStyles.shadows,
	},
	avatar: {
		// dimensions set dynamically
	},
	info: {
		flex: 1,
	},
	name: {
		marginBottom: 0,
	},
	phone: {
		marginTop: scaleSize(2),
	},
});
