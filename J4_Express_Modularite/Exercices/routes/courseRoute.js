import express from "express";
import * as courseController from "../controllers/courseController.js"


const courseRouter = express.Router();

courseRouter.get("/", courseController.getAllCourses);

courseRouter.get("/:id", courseController.getCourseById);

courseRouter.post("/", courseController.createCourse)
export default courseRouter;

