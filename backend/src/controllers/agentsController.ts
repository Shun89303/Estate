import { Request, Response } from "express";
import * as AgentModel from "../models/agentsModel";

export const getAgents = async (req: Request, res: Response) => {
	try {
		const agents = await AgentModel.getAllAgents();
		res.json({ data: agents });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Failed to fetch agents" });
	}
};

export const getAgent = async (req: Request, res: Response) => {
	try {
		const id = parseInt(req.params.id);
		const agent = await AgentModel.getAgentById(id);
		if (!agent) return res.status(404).json({ error: "Agent not found" });
		res.json(agent);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Failed to fetch agent" });
	}
};

export const createAgent = async (req: Request, res: Response) => {
	try {
		const agentId = await AgentModel.createAgent(req.body);
		res.status(201).json({ message: "Agent created", id: agentId });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Failed to create agent" });
	}
};

export const updateAgent = async (req: Request, res: Response) => {
	try {
		const id = parseInt(req.params.id);
		await AgentModel.updateAgent(id, req.body);
		res.json({ message: "Agent updated" });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Failed to update agent" });
	}
};

export const deleteAgent = async (req: Request, res: Response) => {
	try {
		const id = parseInt(req.params.id);
		await AgentModel.deleteAgent(id);
		res.json({ message: "Agent deleted" });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Failed to delete agent" });
	}
};
