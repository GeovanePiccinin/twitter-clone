import { handleError } from "../error.js";
import UserService from "../services/user.service.js";

export const getUsers = async (req, res, next) => {
  try {
    res.send(await UserService.getUsers());
    logger.info("GET /user");
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  try {
    res.send(await UserService.getUser(req.params.id));
    logger.info("GET /user/:id");
  } catch (err) {
    next(err);
  }
};

export async function updateUser(req, res, next) {
  try {
    let user = req.body;
    user = await UserService.updateUser(user);
    res.send(user);
    logger.info(`PUT /user - ${JSON.stringify(user)}`);
  } catch (err) {
    next(err);
  }
}

export async function deleteUser(req, res, next) {
  try {
    await UserService.deleteUser(req.params.id);
    res.end();

    logger.info(`DELETE /user/:user_id`);
  } catch (err) {
    next(err);
  }
}

export async function followUser(req, res, next) {
  try {
    let entities = req.body;
    if (!entities.sourceId || !entities.targetId) {
      throw handleError(400, "Source and target are required.");
    }
    const following = await UserService.followUser(
      entities.sourceId,
      entities.targetId
    );
    res.send(`${entities.sourceId} is now following ${entities.targetId}`);
  } catch (err) {
    next(err);
  }
}

export async function unfollowUser(req, res, next) {
  try {
    let entities = req.body;
    if (!entities.sourceId || !entities.targetId) {
      throw handleError(400, "Source and target are required.");
    }
    const following = await UserService.unfollowUser(
      entities.sourceId,
      entities.targetId
    );
    res.send(`${entities.sourceId} unfollowing ${entities.targetId}`);
  } catch (err) {
    next(err);
  }
}
