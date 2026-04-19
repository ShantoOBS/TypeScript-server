import express from "express"
const router= express.Router();
import { userContorllers } from "./user.controller"
import { auth } from "../../middleware/auth";

router.post("/",userContorllers.createUser);

router.get("/",auth("user"),userContorllers.getAllUser);

router.get("/:id",userContorllers.getSingleUser);

router.put("/:id",userContorllers.updateUser);

router.delete("/:id",userContorllers.deleteUser);

export const userRoutes = router;