import { Request, Response } from "express";
import { PropertyModel } from "../models/propertiesModel";
import db from "../config/db";

export const getAllProperties = async (req: Request, res: Response) => {
	try {
		const properties = await PropertyModel.getAllWithMediaFeaturesAndAgents();
		res.json(properties);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Failed to fetch properties" });
	}
};

export const getPropertyById = async (req: Request, res: Response) => {
	try {
		const id = parseInt(req.params.id);
		const property = await PropertyModel.getById(id);
		if (!property) return res.status(404).json({ error: "Property not found" });
		res.json(property);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Failed to fetch property" });
	}
};

export const createProperty = async (req: Request, res: Response) => {
	const connection = await db.getConnection();

	try {
		await connection.beginTransaction();

		const propertyId = await PropertyModel.create(req.body);

		const files = req.files as {
			cover?: Express.Multer.File[];
			gallery?: Express.Multer.File[];
			videos?: Express.Multer.File[];
		};

		await PropertyModel.addMedia(propertyId, [
			...(files?.cover?.map((f) => ({ type: "cover", url: f.path })) || []),
			...(files?.gallery?.map((f, i) => ({
				type: "image",
				url: f.path,
				sort_order: i,
			})) || []),
			...(files?.videos?.map((f, i) => ({
				type: "video",
				url: f.path,
				sort_order: i,
			})) || []),
		]);

		await connection.commit();

		res.status(201).json({
			message: "Property created",
			propertyId,
		});
	} catch (err) {
		await connection.rollback();

		console.error(err);
		res.status(500).json({ error: "Failed to create property" });
	} finally {
		connection.release();
	}
};

export const updateProperty = async (req: Request, res: Response) => {
	try {
		const id = parseInt(req.params.id);
		await PropertyModel.update(id, req.body);
		res.json({ message: "Property updated" });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Failed to update property" });
	}
};

export const deleteProperty = async (req: Request, res: Response) => {
	try {
		const id = parseInt(req.params.id);
		await PropertyModel.delete(id);
		res.json({ message: "Property deleted" });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Failed to delete property" });
	}
};
