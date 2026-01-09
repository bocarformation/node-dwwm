import express from "express";
import * as bookController from "../controllers/bookController.js";

const bookRouter = express.Router();

bookRouter.get("/", bookController.getAllBooks);
bookRouter.get("/:id", bookController.getBookById);
bookRouter.post("/", bookController.createBook);
bookRouter.put("/:id", bookController.updateBook);
bookRouter.delete("/:id", bookController.deleteBook)



export default bookRouter