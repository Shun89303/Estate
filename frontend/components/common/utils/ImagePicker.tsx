import {
	View,
	Image,
	TouchableOpacity,
	StyleSheet,
	ViewStyle,
} from "react-native";
import { User, Camera } from "lucide-react-native";
import { scaleSize, moderateScale } from "@/utils/metrics";

interface ImagePickerProps {
	imageUri?: string | null;
	onPress?: () => void;
	backgroundColor: string;
	iconColor: string;
	dashedBorder?: boolean;
	showCameraOverlay?: boolean;
	size?: number; // base design size (will be scaled)
	borderRadius?: number; // base design radius (will be scaled)
	iconSize?: number; // base design icon size (will be moderately scaled)
	cameraOverlayColor?: string;
}

export function ImagePicker({
	imageUri,
	onPress,
	backgroundColor,
	iconColor,
	dashedBorder = false,
	showCameraOverlay = false,
	size = 100, // base design value
	borderRadius = 15, // base design value
	iconSize = 38, // base design value
	cameraOverlayColor,
}: ImagePickerProps) {
	// Scale all dimensions
	const scaledSize = scaleSize(size);
	const scaledRadius = scaleSize(borderRadius);
	const scaledIconSize = moderateScale(iconSize);
	const scaledOverlaySize = scaleSize(32);
	const scaledOverlayRadius = scaleSize(10);
	const scaledCameraIcon = moderateScale(16);
	const scaledBorderWidth = scaleSize(2);

	const overlayColor = cameraOverlayColor || iconColor;

	const containerStyle: ViewStyle = {
		width: scaledSize,
		height: scaledSize,
		borderRadius: scaledRadius,
		backgroundColor,
		justifyContent: "center",
		alignItems: "center",
		overflow: "hidden",
		position: "relative",
		alignSelf: "center",
	};

	if (dashedBorder) {
		containerStyle.borderWidth = scaledBorderWidth;
		containerStyle.borderStyle = "dashed";
		containerStyle.borderColor = iconColor;
	}

	const content = (
		<View style={containerStyle}>
			{imageUri ? (
				<Image
					source={{ uri: imageUri }}
					style={[styles.image, { borderRadius: scaledRadius }]}
				/>
			) : (
				<User size={scaledIconSize} color={iconColor} />
			)}
			{showCameraOverlay && (
				<View
					style={[
						styles.cameraOverlay,
						{
							width: scaledOverlaySize,
							height: scaledOverlaySize,
							borderRadius: scaledOverlayRadius,
							backgroundColor: overlayColor,
							borderWidth: scaledBorderWidth,
						},
					]}
				>
					<Camera size={scaledCameraIcon} color="#fff" />
				</View>
			)}
		</View>
	);

	if (onPress) {
		return <TouchableOpacity onPress={onPress}>{content}</TouchableOpacity>;
	}
	return content;
}

const styles = StyleSheet.create({
	image: {
		width: "100%",
		height: "100%",
	},
	cameraOverlay: {
		position: "absolute",
		bottom: -scaleSize(5),
		right: -scaleSize(5),
		justifyContent: "center",
		alignItems: "center",
		borderColor: "#fff",
	},
});
