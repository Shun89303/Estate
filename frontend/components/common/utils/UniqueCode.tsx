import { StyleSheet } from "react-native";
import BodyText from "@/components/common/typography/BodyText";

interface UniqueCodeProps {
	code: string;
}

export default function UniqueCode({ code }: UniqueCodeProps) {
	return (
		<BodyText variant="normal" style={styles.code}>
			{code}
		</BodyText>
	);
}

const styles = StyleSheet.create({
	code: {
		marginBottom: 0,
	},
});
