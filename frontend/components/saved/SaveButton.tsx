import { TouchableOpacity } from "react-native";
import { Heart } from "lucide-react-native";
import {
	useSavedPropertiesStore,
	SavedItem,
} from "@/stores/savedPropertiesStore";
import { moderateScale } from "@/utils/metrics";
import { lightColors } from "@/theme/light";

interface SaveButtonProps {
	savedItem: SavedItem;
	size?: number;
}

export default function SaveButton({ savedItem, size = 24 }: SaveButtonProps) {
	const saved = useSavedPropertiesStore((state) =>
		state.items.some((item) => item.uniqueCode === savedItem.uniqueCode),
	);
	const { addSaved, removeSaved } = useSavedPropertiesStore();

	const handlePress = () => {
		if (saved) {
			removeSaved(savedItem.uniqueCode);
		} else {
			addSaved(savedItem);
		}
	};

	return (
		<TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
			<Heart
				size={moderateScale(size)}
				color={saved ? lightColors.danger : lightColors.bigTitleText}
				fill={saved ? lightColors.danger : "none"}
			/>
		</TouchableOpacity>
	);
}
