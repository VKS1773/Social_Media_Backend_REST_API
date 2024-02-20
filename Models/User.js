import mongoose from "mongoose";
const schema = mongoose.Schema;
const userSchema = new schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    minlength: 6,
  },
});
export default mongoose.model("User", userSchema);