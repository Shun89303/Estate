import { Router } from "express";
import * as AgentController from "../controllers/agentsController";

const router = Router();

router.get("/", AgentController.getAgents);
router.get("/:id", AgentController.getAgent);
router.post("/", AgentController.createAgent);
router.put("/:id", AgentController.updateAgent);
router.delete("/:id", AgentController.deleteAgent);

export default router;
