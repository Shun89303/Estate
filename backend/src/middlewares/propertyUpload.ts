import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { getUploadPath } from "../utils/propertyPath";

const storage = multer.diskStorage({
	destination: async (req, file, cb) => {
		try {
			const { listing_type, slug } = req.body;

			if (!listing_type || !slug) {
				return cb(new Error("Missing listing_type or slug"), "");
			}

			let mediaType: "cover" | "gallery" | "videos" = "gallery";

			if (file.fieldname === "cover") mediaType = "cover";
			if (file.fieldname === "videos") mediaType = "videos";

			const uploadPath = await getUploadPath(listing_type, slug, mediaType);
			cb(null, uploadPath);
		} catch (err) {
			cb(err as any, "");
		}
	},

	filename: (req, file, cb) => {
		const ext = path.extname(file.originalname);
		cb(null, `${uuidv4()}${ext}`);
	},
});

export const uploadPropertyMedia = multer({ storage });
