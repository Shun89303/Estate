import { Request, Response, NextFunction } from "express";
import { slugify } from "../utils/slugify";

export function generateSlug(req: Request, res: Response, next: NextFunction) {
	if (req.body.name) {
		req.body.slug = slugify(req.body.name);
	}
	next();
}
