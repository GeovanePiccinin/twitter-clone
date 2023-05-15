import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      max: 280,
    },
    likes: {
      type: Array,
      defaultValue: [],
    },
  },
  { collection: "tweets", timestamps: true }
);

export default mongoose.model("Tweet", tweetSchema);
