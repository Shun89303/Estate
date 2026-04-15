import { useState, useRef, useCallback } from "react";
import {
	View,
	StyleSheet,
	Pressable,
	Animated,
	Dimensions,
	TouchableWithoutFeedback,
} from "react-native";
import {
	Lock,
	LockOpen,
	Coins,
	EyeOff,
	ChartColumn,
} from "lucide-react-native";
import Title from "@/components/common/typography/Title";
import BodyText from "@/components/common/typography/BodyText";
import SubTitle from "@/components/common/typography/SubTitle";
import { lightColors } from "@/theme/light";
import { spacing, scaleSize, moderateScale } from "@/utils/metrics";
import globalStyles from "@/styles/styles";
import { BuyBusiness } from "@/mock/buyBusiness";
import formatPriceShort from "@/utils/formatPriceShort";

const { height: screenHeight } = Dimensions.get("window");

interface UnlockSheetProps {
	property: BuyBusiness;
	coinBalance: number;
	onUnlock: () => void;
	onClose: () => void;
}

function UnlockSheetContent({
	property,
	coinBalance,
	onUnlock,
	onClose,
}: UnlockSheetProps) {
	return (
		<>
			<View style={styles.sheetHeader}>
				<View style={styles.lockIconContainer}>
					<Lock size={moderateScale(30)} color={lightColors.brand} />
				</View>
				<Title variant="page" style={styles.sheetTitle}>
					Unlock Business Info
				</Title>
				<BodyText variant="normal" style={styles.sheetSubtitle}>
					{property.title}
				</BodyText>
			</View>

			<View style={styles.sheetBox}>
				<View>
					<View style={styles.financialHeader}>
						<ChartColumn size={moderateScale(15)} color={lightColors.brand} />
						<Title variant="small" style={styles.financialTitle}>
							Financial Preview
						</Title>
					</View>
					<BodyText variant="normal">Asking Price</BodyText>
					<BodyText variant="normal">Monthly Revenue</BodyText>
					<BodyText variant="normal">Monthly Profit</BodyText>
					<BodyText variant="normal">Est. ROI</BodyText>
				</View>
				<View style={styles.financialValues}>
					<View style={styles.emptySpacer} />
					<SubTitle variant="normal" style={styles.financialValue}>
						฿{property.price.toLocaleString()}
					</SubTitle>
					<SubTitle
						variant="normal"
						style={[styles.financialValue, { color: lightColors.bigTitleText }]}
					>
						฿{formatPriceShort(property.monthlyRevenue)}/mo
					</SubTitle>
					<SubTitle
						variant="normal"
						style={[styles.financialValue, { color: lightColors.success }]}
					>
						฿{formatPriceShort(property.monthlyProfit)}/mo
					</SubTitle>
					<SubTitle variant="normal" style={styles.financialValue}>
						{property.roiEst}% /yr
					</SubTitle>
				</View>
			</View>

			<View style={styles.sheetBox}>
				<View>
					<BodyText variant="normal">UNLOCK TO REVEAL</BodyText>
					<BodyText variant="normal">Full Address</BodyText>
					<BodyText variant="normal">Owner Contact</BodyText>
				</View>
				<View style={styles.revealValues}>
					<View style={styles.emptySpacer} />
					<View style={styles.hiddenRow}>
						<EyeOff size={moderateScale(12)} color={lightColors.bigTitleText} />
						<Title variant="small" style={styles.hiddenText}>
							Hidden
						</Title>
					</View>
					<View style={styles.hiddenRow}>
						<EyeOff size={moderateScale(12)} color={lightColors.bigTitleText} />
						<Title variant="small" style={styles.hiddenText}>
							Hidden
						</Title>
					</View>
				</View>
			</View>

			<View style={[styles.sheetBox, styles.sheetBoxTransparent]}>
				<View>
					<BodyText variant="normal">Cost</BodyText>
					<BodyText variant="normal">Your Balance</BodyText>
				</View>
				<View style={styles.costValues}>
					<View style={styles.hiddenRow}>
						<Coins size={moderateScale(12)} color={lightColors.brand} />
						<SubTitle variant="normal" style={{ marginBottom: 0 }}>
							{property.unlockCoins} Coins
						</SubTitle>
					</View>
					<View style={styles.hiddenRow}>
						<Coins size={moderateScale(12)} color={lightColors.brand} />
						<Title variant="small" style={{ marginBottom: 0 }}>
							{coinBalance} coins
						</Title>
					</View>
				</View>
			</View>

			<Pressable
				style={[styles.unlockBtn, { backgroundColor: lightColors.brand }]}
				onPress={onUnlock}
			>
				<LockOpen size={moderateScale(12)} color="#fff" />
				<BodyText variant="normal" style={styles.unlockBtnText}>
					Unlock for {property.unlockCoins} Coins
				</BodyText>
			</Pressable>
		</>
	);
}

export function useUnlockSheet() {
	const [showSheet, setShowSheet] = useState(false);
	const [property, setProperty] = useState<BuyBusiness | null>(null);
	const [coinBalance, setCoinBalance] = useState(0);
	const slideAnim = useRef(new Animated.Value(0)).current;
	const onUnlockCallback = useRef<(() => void) | null>(null);

	const open = useCallback(
		(selectedProperty: BuyBusiness, balance: number, onUnlock: () => void) => {
			setProperty(selectedProperty);
			setCoinBalance(balance);
			onUnlockCallback.current = onUnlock;
			setShowSheet(true);
			Animated.timing(slideAnim, {
				toValue: 1,
				duration: 300,
				useNativeDriver: true,
			}).start();
		},
		[],
	);

	const close = useCallback(() => {
		Animated.timing(slideAnim, {
			toValue: 0,
			duration: 300,
			useNativeDriver: true,
		}).start(() => {
			setShowSheet(false);
			setProperty(null);
			onUnlockCallback.current = null;
		});
	}, []);

	const handleUnlock = useCallback(() => {
		if (onUnlockCallback.current) {
			onUnlockCallback.current();
		}
		close();
	}, [close]);

	const UnlockSheet = () => (
		<>
			{showSheet && property && (
				<>
					<TouchableWithoutFeedback onPress={close}>
						<Animated.View
							style={[
								styles.backdrop,
								{
									opacity: slideAnim.interpolate({
										inputRange: [0, 1],
										outputRange: [0, 0.5],
									}),
								},
							]}
						/>
					</TouchableWithoutFeedback>
					<Animated.View
						style={[
							styles.sheetContainer,
							{
								transform: [
									{
										translateY: slideAnim.interpolate({
											inputRange: [0, 1],
											outputRange: [screenHeight, 0],
										}),
									},
								],
								height: screenHeight * 0.75,
							},
						]}
					>
						<View style={styles.sheetHandle} />
						<View style={styles.sheetContent}>
							<UnlockSheetContent
								property={property}
								coinBalance={coinBalance}
								onUnlock={handleUnlock}
								onClose={close}
							/>
						</View>
					</Animated.View>
				</>
			)}
		</>
	);

	return { open, close, UnlockSheet };
}

const styles = StyleSheet.create({
	backdrop: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: "#000",
	},
	sheetContainer: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: lightColors.background,
		borderTopLeftRadius: scaleSize(20),
		borderTopRightRadius: scaleSize(20),
		...globalStyles.shadows,
	},
	sheetHandle: {
		width: scaleSize(40),
		height: scaleSize(4),
		backgroundColor: lightColors.mutedBorder,
		borderRadius: scaleSize(2),
		alignSelf: "center",
		marginTop: spacing.sm,
		marginBottom: spacing.md,
	},
	sheetContent: {
		flex: 1,
		paddingHorizontal: spacing.lg,
		paddingBottom: spacing.md,
	},
	sheetHeader: {
		alignItems: "center",
	},
	lockIconContainer: {
		backgroundColor: lightColors.brandBG,
		padding: spacing.lg,
		borderRadius: scaleSize(99),
		marginBottom: spacing.sm,
	},
	sheetTitle: {
		marginBottom: spacing.xs,
	},
	sheetSubtitle: {
		textAlign: "center",
		color: lightColors.bodyText,
	},
	sheetBox: {
		flexDirection: "row",
		justifyContent: "space-between",
		backgroundColor: lightColors.mutedBackgroundWeaker,
		padding: spacing.md,
		marginVertical: spacing.md,
		borderRadius: scaleSize(10),
	},
	sheetBoxTransparent: {
		backgroundColor: "transparent",
	},
	financialHeader: {
		flexDirection: "row",
		alignItems: "center",
		gap: spacing.sm,
	},
	financialTitle: {
		marginBottom: 0,
	},
	financialValues: {
		alignItems: "flex-end",
	},
	revealValues: {
		alignItems: "flex-end",
	},
	costValues: {
		alignItems: "flex-end",
	},
	emptySpacer: {
		height: scaleSize(24),
	},
	hiddenRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: scaleSize(5),
	},
	hiddenText: {
		marginBottom: 0,
	},
	financialValue: {
		marginBottom: 0,
	},
	unlockBtn: {
		paddingVertical: spacing.md,
		borderRadius: scaleSize(8),
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: scaleSize(5),
	},
	unlockBtnText: {
		fontWeight: "600",
		color: "#fff",
		marginBottom: 0,
	},
});
