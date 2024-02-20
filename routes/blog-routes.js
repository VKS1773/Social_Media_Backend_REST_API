import express from "express";
import {
  AddBlog,
  deleteBlog,
  getAllBlog,
  getById,
  getByuserId,
  updateBlog,
} from "../controllers/blog-controller";
const BlogRouter = express.Router();
BlogRouter.get("/", getAllBlog);
BlogRouter.post("/add", AddBlog);
BlogRouter.put("/update/:id", updateBlog);
BlogRouter.get("/:id", getById);
BlogRouter.delete("/:id", deleteBlog);
BlogRouter.get("/user/:id", getByuserId);

export default BlogRouter;
