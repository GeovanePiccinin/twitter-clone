import TweetRepository from "../repositories/tweet.repository.js";

async function createTweet(tweet) {
  return await TweetRepository.createTweet(tweet);
}

async function deleteTweet(id) {
  return await TweetRepository.deleteTweet(id);
}

async function likeOrDislike(id, userId) {
  return await TweetRepository.likeOrDislike(id, userId);
}

async function getUserTimeline(userId) {
  return await TweetRepository.getUserTimeline(userId);
}

async function getUserTweets(userId) {
  return await TweetRepository.getUserTweets(userId);
}

async function getExploreTweets() {
  return await TweetRepository.getExploreTweets();
}

export default {
  createTweet,
  deleteTweet,
  likeOrDislike,
  getUserTimeline,
  getUserTweets,
  getExploreTweets,
};
