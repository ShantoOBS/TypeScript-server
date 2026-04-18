import express from "express"
const router= express.Router();
import { userContorllers } from "./user.controller"

router.post("/",userContorllers.createUser);

router.get("/",userContorllers.getAllUser);

router.get("/:id",userContorllers.getSingleUser);

router.put("/:id",userContorllers.updateUser);

router.delete("/:id",userContorllers.deleteUser);

export const userRoutes = router;