import { handleError } from "../error.js";
import TweetService from "../services/tweet.service.js";

export const createTweet = async (req, res, next) => {
  try {
    let tweet = req.body;
    if (!tweet.description || !tweet.userId) {
      throw handleError(400, "Description required");
    }
    const savedTweet = await TweetService.createTweet(tweet);
    res.status(200).json(savedTweet);
    logger.info(`POST /tweet/`);
  } catch (err) {
    next(handleError(500, err));
  }
};

export const deleteTweet = async (req, res, next) => {
  try {
    if (!req.params.id) {
      throw handleError(400, "ID required");
    }
    await TweetService.deleteTweet(req.params.id);
    res.end();
    logger.info(`DELETE /tweet/:id`);
  } catch (err) {
    next(handleError(500, err));
  }
};

export const likeOrDislike = async (req, res, next) => {
  try {
    if (!req.body.id || !req.body.userId) {
      throw handleError(400, "ID required");
    }
    await TweetService.likeOrDislike(req.body.id, req.body.userId);
    res.status(200).json("tweet has been like/disliked");
    logger.info(`PUT /tweet/like/`);
  } catch (err) {
    next(handleError(500, err));
  }
};

export const getUserTimeline = async (req, res, next) => {
  try {
    res.status(200).json(await TweetService.getUserTimeline(req.params.userId));
    logger.info("GET tweet/timeline/:userId");
  } catch (err) {
    next(handleError(500, err));
  }
};

export const getUserTweets = async (req, res, next) => {
  try {
    res.status(200).json(await TweetService.getUserTweets(req.params.userId));
    logger.info("GET /tweet/:userId");
  } catch (err) {
    next(handleError(500, err));
  }
};

export const getExploreTweets = async (req, res, next) => {
  console.log("getExploreTweets");
  try {
    res.status(200).json(await TweetService.getExploreTweets());
    logger.info("GET /tweet/explore");
  } catch (err) {
    next(handleError(500, err));
  }
};
