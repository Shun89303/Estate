import { Router } from "express";
import * as PropertyController from "../controllers/propertiesController";
import { uploadPropertyMedia } from "../middlewares/propertyUpload";
import { generateSlug } from "../middlewares/slugify";

const router = Router();

router.get("/", PropertyController.getAllProperties);
router.get("/:id", PropertyController.getPropertyById);
router.post(
	"/",
	generateSlug,
	uploadPropertyMedia.fields([
		{ name: "cover", maxCount: 1 },
		{ name: "gallery", maxCount: 10 },
		{ name: "videos", maxCount: 5 },
	]),
	PropertyController.createProperty,
);
router.put("/:id", PropertyController.updateProperty);
router.delete("/:id", PropertyController.deleteProperty);

export default router;
