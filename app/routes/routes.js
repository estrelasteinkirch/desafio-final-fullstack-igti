import express from "express";
import transactionService from "../services/transactionService.js"

const transactionRouter = express.Router();

transactionRouter.post("/new", transactionService.create);
transactionRouter.get("/all", transactionService.findAll);
transactionRouter.get("/", transactionService.findPeriod);
transactionRouter.put("/:id", transactionService.update);
transactionRouter.delete("/:id", transactionService.remove);
transactionRouter.delete("/", transactionService.removeAll);

export default transactionRouter;
