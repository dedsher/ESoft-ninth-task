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
    try {
      const newUser = await this.userService.addUser(req.body);
      res.status(HTTP_CODES.CREATED).json(newUser);
    } catch (err) {
      console.error(err);
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
    if (!users) {
      return res
        .status(HTTP_CODES.NOT_FOUND)
        .json({ error: HTTP_MESSAGES.NOT_FOUND });
    }
    res.status(HTTP_CODES.OK).json(users);
  }

  async getUsersByAge(req, res) {
    const users = await this.userService.getUsersByAge(req.params.age);
    if (!users) {
      return res
        .status(HTTP_CODES.NOT_FOUND)
        .json({ error: HTTP_MESSAGES.NOT_FOUND });
    }
    res.status(HTTP_CODES.OK).json(users);
  }

  async getUsersByDomain(req, res) {
    const users = await this.userService.getUsersByDomain(req.params.domain);
    if (!users) {
      return res
        .status(HTTP_CODES.NOT_FOUND)
        .json({ error: HTTP_MESSAGES.NOT_FOUND });
    }
    res.status(HTTP_CODES.OK).json(users);
  }

  async getUserFriends(req, res) {
    const friends = await this.userService.getUserFriends(req.params.id);
    if (!friends) {
      return res
        .status(HTTP_CODES.NOT_FOUND)
        .json({ error: HTTP_MESSAGES.NOT_FOUND });
    }
    res.status(HTTP_CODES.OK).json(friends);
  }

  async addFriend(req, res) {
    const user = await this.userService.addFriend(req.params.id, req.body.friendId);
    if (!user) {
      return res
        .status(HTTP_CODES.NOT_FOUND)
        .json({ error: HTTP_MESSAGES.NOT_FOUND });
    }
    res.status(HTTP_CODES.CREATED).json(user);
  }
}

module.exports = UserController;
