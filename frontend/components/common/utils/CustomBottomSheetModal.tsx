// components/common/CustomBottomSheetModal.tsx
import {
	Modal,
	View,
	StyleSheet,
	TouchableOpacity,
	Dimensions,
	ScrollView,
} from "react-native";
import { spacing, scaleSize } from "@/utils/metrics";
import { lightColors } from "@/theme/light";

const { height: screenHeight } = Dimensions.get("window");

interface CustomBottomSheetModalProps {
	visible: boolean;
	onClose: () => void;
	children: React.ReactNode;
	snapPoints?: string[]; // ignored – we use dynamic height
}

export default function CustomBottomSheetModal({
	visible,
	onClose,
	children,
}: CustomBottomSheetModalProps) {
	return (
		<Modal
			visible={visible}
			transparent
			animationType="slide"
			onRequestClose={onClose}
		>
			<TouchableOpacity
				style={styles.backdrop}
				activeOpacity={1}
				onPress={onClose}
			>
				<View style={styles.container}>
					<View style={styles.handleBar} />
					<ScrollView showsVerticalScrollIndicator={false}>
						<View style={styles.content}>{children}</View>
					</ScrollView>
				</View>
			</TouchableOpacity>
		</Modal>
	);
}

const styles = StyleSheet.create({
	backdrop: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.5)",
		justifyContent: "flex-end",
	},
	container: {
		backgroundColor: lightColors.background,
		borderTopLeftRadius: scaleSize(20),
		borderTopRightRadius: scaleSize(20),
		paddingTop: spacing.md,
		maxHeight: screenHeight * 0.8,
	},
	handleBar: {
		width: scaleSize(40),
		height: scaleSize(4),
		backgroundColor: lightColors.mutedBorder,
		borderRadius: scaleSize(2),
		alignSelf: "center",
		marginBottom: spacing.md,
	},
	content: {
		padding: spacing.lg,
	},
});
