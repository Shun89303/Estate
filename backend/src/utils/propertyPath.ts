import path from "path";
import fs from "fs-extra";

export async function getUploadPath(
	listingType: string,
	propertySlug: string,
	mediaType: "cover" | "gallery" | "videos",
) {
	const uploadPath = path.join(
		__dirname,
		"../../uploads/properties",
		listingType,
		propertySlug,
		mediaType,
	);

	await fs.ensureDir(uploadPath);
	return uploadPath;
}
