import Blog from "../Models/Blog";
import User from "../Models/User";
import mongoose from "mongoose";

export const getAllBlog = async (req, res) => {
  let blogs;
  try {
    blogs = await Blog.find();
  } catch (error) {
    return console.log(error);
  }
  if (!blogs) {
    return res.status(404).json({ message: "no Blog find" });
  }
  return res.status(200).json({ blogs });
};

export const AddBlog = async (req, res) => {
  let existinguser;
  try {
    existinguser = await User.findById(req.body.user);
  } catch (error) {
    return console.log(error);
  }
  console.log(existinguser);
  if (!existinguser) {
    return res.status(400).json({ messgae: "user for this blog not find" });
  }
  const blog = new Blog({
    title: req.body.title,
    description: req.body.description,
    image: req.body.image,
    user: req.body.user,
  });
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await blog.save({ session });
    existinguser.Blogs.push(blog);
    await existinguser.save({ session });
    await session.commitTransaction();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
  return res.status(200).json({ blog });
};

export const updateBlog = async (req, res) => {
  const blogId = req.params.id;
  let blog;
  try {
    blog = await Blog.findByIdAndUpdate(blogId, {
      title: req.body.title,
      description: req.body.description,
    });
  } catch (error) {
    console.log(error);
  }
  if (!blog) {
    return res.status(500).json({ message: "blog not find" });
  }
  return res.status(200).json({ blog });
};

export const getById = async (req, res) => {
  const id = req.params.id;
  let blog;
  try {
    blog = await Blog.findById(id);
    console.log(blog);
  } catch (error) {
    return console.log(error);
  }
  if (!blog) {
    return res.status(400).json({ message: "does find Blog of this id" });
  }
  return res.status(200).json({ blog });
};

export const deleteBlog = async (req, res) => {
  const id = req.params.id;
  let blog;
  try {
    blog = await Blog.findByIdAndDelete(id).populate("user");
    await blog.user.Blogs.pull(blog);
    await blog.user.save();
  } catch (error) {
    return console.log(error);
  }
  if (!blog) {
    return res.status(400).json({ message: "does not find blog" });
  }
  return res.status(200).json({ message: "successfullly deleted" });
};

export const getByuserId = async (req, res) => {
  const userId = req.params.id;
  let userBlogs;
  try {
    userBlogs = await User.findById(userId).populate("Blogs");
  } catch (error) {
    console.log(error);
  }
  if (!userBlogs) {
    return res.status(404).json({ message: "No Blog found" });
  }
  return res.status(200).json({ Blogs: userBlogs });
};
