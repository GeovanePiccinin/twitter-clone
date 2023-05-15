import { connect } from "./mongo.db.js";
import Tweet from "../models/tweet.model.js";
import User from "../models/user.model.js";

async function createTweet(tweet) {
  try {
    await connect();
    const newTweet = new Tweet(tweet);
    return newTweet
      .save()
      .then((response) => {
        console.log("new tweet inserted into db", response);
        return response;
      })
      .catch((err) => {
        if (err) {
          throw err;
        }
      });
  } catch (err) {
    throw err;
  }
}

async function deleteTweet(id) {
  try {
    await connect();
    await Tweet.findByIdAndDelete(id);
  } catch (err) {
    throw err;
  }
}

async function updateTweet(tweet) {
  try {
    await connect();
    await Tweet.findByIdAndUpdate(tweet.id, tweet);
  } catch (err) {
    throw err;
  }
}

async function likeOrDislike(id, userId) {
  try {
    await connect();
    const tweet = await Tweet.findById(id);
    if (!tweet.likes.includes(userId)) {
      await tweet.updateOne({ $push: { likes: userId } });
    } else {
      await tweet.updateOne({ $pull: { likes: userId } });
    }
  } catch (err) {
    throw err;
  }
}

async function getUserTimeline(userId) {
  try {
    await connect();
    const currentUser = await User.findById(userId);
    const userTweets = await Tweet.find({ userId: currentUser._id });
    const tweetsFromFollowedUsers = await Promise.all(
      currentUser.following.map((userBeingFollowedId) => {
        return Tweet.find({ userId: userBeingFollowedId });
      })
    );
    return userTweets.concat(...tweetsFromFollowedUsers);
  } catch (err) {
    throw err;
  }
}

async function getUserTweets(userId) {
  console.log("userId", userId);
  try {
    await connect();
    return await Tweet.find({ userId }).sort({
      createAt: -1,
    });
  } catch (err) {
    throw err;
  }
}

async function getExploreTweets() {
  console.log("getExploreTweets");
  try {
    await connect();
    return await Tweet.find({
      likes: { $exists: true, $type: "array", $ne: [] },
    }).sort({ likes: -1 });
  } catch (err) {
    throw err;
  }
}

export default {
  createTweet,
  getUserTweets,
  getUserTimeline,
  getExploreTweets,
  likeOrDislike,
  updateTweet,
  deleteTweet,
};
