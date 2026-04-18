import { StyleSheet, TextStyle } from "react-native";
import BodyText from "@/components/common/typography/BodyText";

interface UniqueCodeProps {
	code: string;
	style?: TextStyle;
}

export default function UniqueCode({ code, style }: UniqueCodeProps) {
	return (
		<BodyText variant="normal" style={[styles.code, style]}>
			{code}
		</BodyText>
	);
}

const styles = StyleSheet.create({
	code: {
		marginBottom: 0,
	},
});
