import { BuyBusiness } from "@/mock/buyBusiness";

type RowDefinition = {
	label: string;
	key: keyof BuyBusiness;
	best: "min" | "max" | null;
	format: (value: string | number) => string;
};

export const rows: RowDefinition[] = [
	{
		label: "ASKING PRICE",
		key: "price",
		best: "min",
		format: (v) => `฿${Number(v).toLocaleString()}`,
	},
	{
		label: "MONTHLY REVENUE",
		key: "monthlyRevenue",
		best: "max",
		format: (v) => `฿${Number(v).toLocaleString()}`,
	},
	{
		label: "MONTHLY PROFIT",
		key: "monthlyProfit",
		best: "max",
		format: (v) => `฿${Number(v).toLocaleString()}`,
	},
	{
		label: "EST. ROI",
		key: "roiEst",
		best: "max",
		format: (v) => `${Number(v)}%`,
	},
	{
		label: "EMPLOYEES",
		key: "staffs",
		best: null,
		format: (v) => v.toString(),
	},
	{
		label: "YEARS OPERATING",
		key: "years",
		best: "max",
		format: (v) => v.toString(),
	},
	{
		label: "AREA (sqm)",
		key: "area",
		best: "max",
		format: (v) => v.toString(),
	},
	{ label: "TYPE", key: "type", best: null, format: (v) => v.toString() },
];

export const getBestValue = (
	values: number[],
	type: "min" | "max",
): number | null => {
	if (values.length === 0) return null;
	return type === "min" ? Math.min(...values) : Math.max(...values);
};
