import { TouchableOpacity } from "react-native";
import { Star } from "lucide-react-native";
import { useShortlistStore, ShortlistItem } from "@/stores/shortlistStore";
import { moderateScale } from "@/utils/metrics";
import { lightColors } from "@/theme/light";

interface ShortlistButtonProps {
	item: ShortlistItem;
	size?: number;
}

export default function ShortlistButton({
	item,
	size = 24,
}: ShortlistButtonProps) {
	const { isShortlisted, toggleShortlist } = useShortlistStore();
	const shortlisted = isShortlisted(item.id);

	const handlePress = () => {
		toggleShortlist(item);
	};

	return (
		<TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
			<Star
				size={moderateScale(size)}
				color={shortlisted ? lightColors.brand : lightColors.bodyText}
				fill={shortlisted ? lightColors.brand : "transparent"}
			/>
		</TouchableOpacity>
	);
}
