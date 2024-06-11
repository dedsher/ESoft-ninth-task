const fs = require("fs").promises;
const config = require("../config/config");
const shortid = require("shortid");

class UserRepository {
  constructor() {
    this.usersFile = config.USERS_FILE;
  }

  #readUsersFromFile = async () => {
    try {
      const data = await fs.readFile(this.usersFile, { encoding: "utf8" });
      return JSON.parse(data);
    } catch (err) {
      if (err.code === "ENOENT") {
        return [];
      } else {
        throw new Error("Error reading users.");
      }
    }
  }

  #writeUsersToFile = async (users) => {
    try {
      await fs.writeFile(this.usersFile, JSON.stringify(users, null, 2));
    } catch (err) {
      throw new Error("Error writing users.");
    }
  }

  async getAllUsers() {
    return await this.#readUsersFromFile();
  }

  async updateUser(id, user) {
    const users = await this.#readUsersFromFile();
    const userIndex = users.findIndex((user) => user.id === id);
    users[userIndex] = { ...users[userIndex], ...user };
    await this.#writeUsersToFile(users);
  }

  async deleteUser(id) {
    const users = await this.#readUsersFromFile();
    const updatedUsers = users.filter((user) => user.id !== id);
    await this.#writeUsersToFile(updatedUsers);
  }

  async addUser(userData) {
    const users = await this.#readUsersFromFile();
    const { email, name, age } = userData;
    let userToAdd = {};

    if (email && name && age) {
      userToAdd = { id: shortid.generate(), email, name, age, friends: [] };
    }

    await this.#writeUsersToFile([...users, userToAdd]);
    return userToAdd;
  }

  async addFriend(userId, friendId) {
    const users = await this.#readUsersFromFile();
    const user = users.find((u) => u.id === userId);
    const friend = users.find((u) => u.id === friendId);

    if (!user || !friend) {
      return null;
    }

    if (!user.friends.includes(friendId)) {
      user.friends.push(friendId);
    }
    if (!friend.friends.includes(userId)) {
      friend.friends.push(userId);
    }

    await this.#writeUsersToFile(users);
    return user;
  }
}

module.exports = UserRepository;
