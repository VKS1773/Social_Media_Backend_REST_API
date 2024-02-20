import Blog from "../Models/Blog";

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
  const blog = new Blog({
    title: req.body.title,
    description: req.body.description,
    image: req.body.image,
    user: req.body.user,
  });
  try {
    await blog.save();
  } catch (error) {
    return console.log(error);
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
    blog = await Blog.findByIdAndDelete(id);
  } catch (error) {
    return console.log(error);
  }
  if (!blog) {
    return res.status(400).json({ message: "does not find blog" });
  }
  return res.status(200).json({ message: "successfullly deleted" });
};
