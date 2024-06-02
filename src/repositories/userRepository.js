const fs = require("fs").promises;
const config = require("../config/config");

class UserRepository {
  constructor() {
    this.usersFile = config.USERS_FILE;
  }
  async readUsersFromFile() {
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

  async writeUsersToFile(users) {
    try {
      await fs.writeFile(this.usersFile, JSON.stringify(users, null, 2));
    } catch (err) {
      throw new Error("Error writing users.");
    }
  }
}

module.exports = UserRepository;
