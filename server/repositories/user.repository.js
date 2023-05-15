import { connect } from "./mongo.db.js";
import User from "../models/user.model.js";

async function insertUser(user) {
  try {
    await connect();
    const newUser = new User(user);
    return newUser
      .save()
      .then((response) => {
        console.log("new user inserted into db", response);
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

async function findUserByEmail(email) {
  try {
    await connect();
    const query = User.findOne({ email });
    return await query.exec();
  } catch (err) {
    throw err;
  }
}

async function updateUser(user) {
  try {
    await connect();
    await User.findByIdAndUpdate(user.id, user);
  } catch (err) {
    throw err;
  }
}

async function getUser(userId) {
  try {
    await connect();
    const query = User.findById(userId);
    const response = await query.exec();
    console.log("response getUser repository", response);
    return response;
  } catch (err) {
    throw err;
  }
}

async function getUsers() {
  try {
    await connect();
    const query = User.find({});
    return await query.exec();
  } catch (err) {
    throw err;
  }
}

async function deleteUser(userId) {
  try {
    await connect();
    await User.findByIdAndDelete(userId);
  } catch (err) {
    throw err;
  }
}

async function insertInFollowing(sourceId, targetId) {
  try {
    const currentUser = await getUser(sourceId);

    console.log(currentUser);

    if (!currentUser.following) {
      currentUser.following = [targetId];
    } else if (!currentUser.following.includes(targetId)) {
      currentUser.following.push(targetId);
    }
    await updateUser(currentUser);
  } catch (err) {
    throw err;
  }
}

async function insertInFollowers(sourceId, targetId) {
  try {
    const targetUser = await getUser(targetId);
    if (!targetUser.followers) {
      targetUser.followers = [sourceId];
    } else if (!targetUser.followers.includes(sourceId)) {
      targetUser.followers.push(sourceId);
    }
    await updateUser(targetUser);
  } catch (err) {
    throw err;
  }
}

async function removeOfFollowers(sourceId, targetId) {
  try {
    const targetUser = await getUser(targetId);

    if (targetUser.followers.includes(sourceId)) {
      await targetUser.updateOne({ $pull: { followers: sourceId } });
    }
  } catch (err) {
    throw err;
  }
}

async function removeOfFollowing(sourceId, targetId) {
  try {
    const currentUser = await getUser(sourceId);

    if (currentUser.following.includes(targetId)) {
      await currentUser.updateOne({ $pull: { following: targetId } });
    }
  } catch (err) {
    throw err;
  }
}

export default {
  insertUser,
  findUserByEmail,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
  insertInFollowing,
  insertInFollowers,
  removeOfFollowers,
  removeOfFollowing,
};
