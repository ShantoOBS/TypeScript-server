import express from "express"
const router= express.Router();

import { todoController } from "./todo.controller";

router.post("/",todoController.createTodo);

router.get("/",todoController.getTodo);

router.get("/:id",todoController.getSingleTodo);

router.put("/:id",todoController.updateTodo);

router.delete("/:id",todoController.deleteTodo);

export const todoRoutes=router;