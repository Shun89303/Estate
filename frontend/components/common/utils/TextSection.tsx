import { View, StyleSheet } from "react-native";
import Title from "@/components/common/typography/Title";
import BodyText from "@/components/common/typography/BodyText";
import { spacing } from "@/utils/metrics";

interface TextSectionProps {
	title: string;
	description: string;
	titleVariant?: "page" | "normal" | "small";
	bodyVariant?: "small" | "normal" | "large";
}

export default function TextSection({
	title,
	description,
	titleVariant = "small",
	bodyVariant = "normal",
}: TextSectionProps) {
	return (
		<View style={styles.container}>
			<Title variant={titleVariant} style={styles.title}>
				{title}
			</Title>
			<BodyText variant={bodyVariant} style={styles.body}>
				{description}
			</BodyText>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginBottom: spacing.lg,
	},
	title: {
		marginBottom: spacing.sm,
	},
	body: {
		lineHeight: 20,
	},
});
