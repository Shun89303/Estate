import { Image, StyleSheet, ViewStyle } from "react-native";
import { scaleSize } from "@/utils/metrics";
import { API_BASE_URL } from "@/config/api";

interface LogoProps {
	width?: number;
	height?: number;
	style?: ViewStyle;
}

export default function Logo({ width = 160, height = 50, style }: LogoProps) {
	return (
		<Image
			source={{
				uri: `${API_BASE_URL}/uploads/logo/logo.png`,
			}}
			style={[
				styles.logo,
				{ width: scaleSize(width), height: scaleSize(height) },
				style,
			]}
			resizeMode="cover"
		/>
	);
}

const styles = StyleSheet.create({
	logo: {
		// default aspect ratio preserved by width/height
	},
});
