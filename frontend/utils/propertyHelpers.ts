// import { MOCK_BUYSELL, Property as BuySellProperty } from "@/mock/buySell";
// import { MOCK_ROOM_RENT, RoomRentProperty } from "@/mock/roomRent";
// import {
// 	MOCK_OWNERDIRECT,
// 	Property as OwnerDirectProperty,
// } from "@/mock/ownerDirect";
// // import { MOCK_OFFPLAN, OffPlanProperty } from "@/mock/offPlan";
// // import { MOCK_BUSINESS, BusinessProperty } from "@/mock/business";
// // import { MOCK_BUY_BUSINESS, BuyBusiness } from "@/mock/buyBusiness";
import { PropertyCategory } from "@/stores/savedPropertiesStore";

// export type AnyProperty =
// 	| BuySellProperty
// 	| RoomRentProperty
// 	| OwnerDirectProperty
// 	| OffPlanProperty
// 	| BusinessProperty
// 	| BuyBusiness;

// export function getPropertyByUniqueCode(
// 	uniqueCode: string,
// 	category: PropertyCategory,
// ): AnyProperty | undefined {
// 	switch (category) {
// 		case "buySell":
// 			return MOCK_BUYSELL.find((p) => p.uniqueCode === uniqueCode);
// 		case "roomRent":
// 			return MOCK_ROOM_RENT.find((p) => p.uniqueCode === uniqueCode);
// 		case "ownerDirect":
// 			return MOCK_OWNERDIRECT.find((p) => p.uniqueCode === uniqueCode);
// 		case "offPlan":
// 			return MOCK_OFFPLAN.find((p) => p.uniqueCode === uniqueCode);
// 		case "business":
// 			return MOCK_BUSINESS.find((p) => p.uniqueCode === uniqueCode);
// 		case "buyBusiness":
// 			return MOCK_BUY_BUSINESS.find((p) => p.uniqueCode === uniqueCode);
// 		default:
// 			return undefined;
// 	}
// }

export function getDetailRoute(
	category: PropertyCategory,
	uniqueCode: string,
): string {
	switch (category) {
		case "buySell":
			return `/property/buySell/${uniqueCode}`;
		case "roomRent":
			return `/property/roomRent/${uniqueCode}`;
		case "ownerDirect":
			return `/property/ownerDirect/${uniqueCode}`;
		case "offPlan":
			return `/property/offPlan/${uniqueCode}`;
		case "business":
			return `/property/business/${uniqueCode}`;
		case "buyBusiness":
			return `/property/buyBusiness/${uniqueCode}`;
		default:
			return "/";
	}
}
