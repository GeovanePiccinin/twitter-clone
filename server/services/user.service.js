import UserRepository from "../repositories/user.repository.js";

async function createUser(user) {
  return await UserRepository.insertUser(user);
}

async function findUserByEmail(email) {
  return await UserRepository.findUserByEmail(email);
}

async function updateUser(user) {
  return await UserRepository.updateUser(user);
}

async function deleteUser(user_id) {
  return await UserRepository.deleteUser(user_id);
}

async function getUsers() {
  return await UserRepository.getUsers();
}

async function getUser(userId) {
  return await UserRepository.getUser(userId);
}

async function followUser(sourceId, targetId) {
  await UserRepository.insertInFollowing(sourceId, targetId);
  await UserRepository.insertInFollowers(sourceId, targetId);
}

async function unfollowUser(sourceId, targetId) {
  await UserRepository.removeOfFollowing(sourceId, targetId);
  await UserRepository.removeOfFollowers(sourceId, targetId);
}

export default {
  createUser,
  findUserByEmail,
  updateUser,
  getUser,
  getUsers,
  deleteUser,
  followUser,
  unfollowUser,
};
