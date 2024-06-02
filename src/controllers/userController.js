const { HTTP_CODES, HTTP_MESSAGES } = require("../utils/httpResponses");

class UserController {
  constructor(UserService) {
    this.userService = UserService;
  }

  async getAllUsers(req, res) {
    try {
      const users = await this.userService.getAllUsers();
      if (!users || users.length === 0) {
        return res
          .status(HTTP_CODES.NOT_FOUND)
          .json({ error: HTTP_MESSAGES.NOT_FOUND });
      }
      res.json(users);
    } catch (err) {
      res
        .status(HTTP_CODES.SERVER_ERROR)
        .json({ error: HTTP_MESSAGES.SERVER_ERROR });
    }
  }

  async getUserById(req, res) {
    try {
      const user = await this.userService.getUserById(req.params.id);
      if (user) {
        res.json(user);
      } else {
        res
          .status(HTTP_CODES.NOT_FOUND)
          .json({ error: HTTP_MESSAGES.NOT_FOUND });
      }
    } catch (err) {
      res
        .status(HTTP_CODES.SERVER_ERROR)
        .json({ error: HTTP_MESSAGES.SERVER_ERROR });
    }
  }

  async addUser(req, res) {
    if (!Array.isArray(req.body)) {
      return res
        .status(HTTP_CODES.BAD_REQUEST)
        .json({ error: HTTP_MESSAGES.INVALID_DATA });
    }

    try {
      const newUsers = await this.userService.addUser(req.body);
      res.status(HTTP_CODES.CREATED).json(newUsers);
    } catch (err) {
      res
        .status(HTTP_CODES.BAD_REQUEST)
        .json({ error: HTTP_MESSAGES.SERVER_ERROR });
    }
  }

  async updateUser(req, res) {
    try {
      const updatedUser = await this.userService.updateUser(
        req.params.id,
        req.body
      );
      if (updatedUser) {
        res.json(updatedUser);
      } else {
        res
          .status(HTTP_CODES.NOT_FOUND)
          .json({ error: HTTP_MESSAGES.NOT_FOUND });
      }
    } catch (err) {
      res
        .status(HTTP_CODES.BAD_REQUEST)
        .json({ error: HTTP_MESSAGES.SERVER_ERROR });
    }
  }

  async deleteUser(req, res) {
    try {
      const deletedUser = await this.userService.deleteUser(req.params.id);
      if (deletedUser) {
        res.json(deletedUser);
      } else {
        res
          .status(HTTP_CODES.NOT_FOUND)
          .json({ error: HTTP_MESSAGES.NOT_FOUND });
      }
    } catch (err) {
      res
        .status(HTTP_CODES.SERVER_ERROR)
        .json({ error: HTTP_MESSAGES.SERVER_ERROR });
    }
  }

  async getSortedUsers(req, res) {
    const users = await this.userService.getSortedUsers();
    if (!users || users.length === 0) {
      return res
        .status(HTTP_CODES.NOT_FOUND)
        .json({ error: HTTP_MESSAGES.NOT_FOUND });
    }
    res.status(HTTP_CODES.OK).json(users);
  }

  async getUsersByAge(req, res) {
    const users = await this.userService.getUsersByAge(req.params.age);
    if (!users || users.length === 0) {
      return res
        .status(HTTP_CODES.NOT_FOUND)
        .json({ error: HTTP_MESSAGES.NOT_FOUND });
    }
    res.status(HTTP_CODES.OK).json(users);
  }

  async getUsersByDomain(req, res) {
    const users = await this.userService.getUsersByDomain(req.params.domain);
    if (!users || users.length === 0) {
      return res
        .status(HTTP_CODES.NOT_FOUND)
        .json({ error: HTTP_MESSAGES.NOT_FOUND });
    }
    res.status(HTTP_CODES.OK).json(users);
  }
}

module.exports = UserController;
