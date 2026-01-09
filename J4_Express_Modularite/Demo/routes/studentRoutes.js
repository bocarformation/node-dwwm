import express from "express";
import * as studentController from "../controllers/studentController.js";

// Créer un router Express
const studentRouter = express.Router();

// Définir les routes

// http://localhost:9000/students
studentRouter.get("/", studentController.getAllStudents);
studentRouter.get("/:id", studentController.getStudentById);
studentRouter.post("/", studentController.createStudent);


export default studentRouter;