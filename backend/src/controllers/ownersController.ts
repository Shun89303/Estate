import { Request, Response } from "express";
import * as OwnerModel from "../models/ownersModel";

export const getOwners = async (req: Request, res: Response) => {
	try {
		const owners = await OwnerModel.getAllOwners();
		res.json({ data: owners });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Failed to fetch owners" });
	}
};

export const getOwner = async (req: Request, res: Response) => {
	try {
		const id = parseInt(req.params.id);
		const owner = await OwnerModel.getOwnerById(id);
		if (!owner) return res.status(404).json({ error: "Owner not found" });
		res.json(owner);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Failed to fetch owner" });
	}
};

export const createOwner = async (req: Request, res: Response) => {
	try {
		const ownerId = await OwnerModel.createOwner(req.body);
		res.status(201).json({ message: "Owner created", id: ownerId });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Failed to create owner" });
	}
};

export const updateOwner = async (req: Request, res: Response) => {
	try {
		const id = parseInt(req.params.id);
		await OwnerModel.updateOwner(id, req.body);
		res.json({ message: "Owner updated" });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Failed to update owner" });
	}
};

export const deleteOwner = async (req: Request, res: Response) => {
	try {
		const id = parseInt(req.params.id);
		await OwnerModel.deleteOwner(id);
		res.json({ message: "Owner deleted" });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Failed to delete owner" });
	}
};
