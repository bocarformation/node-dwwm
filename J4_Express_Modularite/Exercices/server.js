import express from "express";
import courseRouter from "./routes/courseRoute.js";
import bookRouter from "./routes/bookRoute.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.json({ message: "API students and books" })
})



app.use("/courses", courseRouter);
app.use("/books", bookRouter);

const PORT = 9000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);

})