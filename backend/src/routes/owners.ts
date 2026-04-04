import { Router } from "express";
import * as OwnerController from "../controllers/ownersController";

const router = Router();

router.get("/", OwnerController.getOwners);
router.get("/:id", OwnerController.getOwner);
router.post("/", OwnerController.createOwner);
router.put("/:id", OwnerController.updateOwner);
router.delete("/:id", OwnerController.deleteOwner);

export default router;
