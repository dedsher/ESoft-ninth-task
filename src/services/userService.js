const { v4: uuidv4 } = require("uuid");

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async getAllUsers() {
    return await this.userRepository.readUsersFromFile();
  }

  async getSortedUsers() {
    const users = await this.userRepository.readUsersFromFile();

    const sortedUsers = users.slice().sort((a, b) => {
      return a.name.localeCompare(b.name);
    });

    return sortedUsers;
  }

  async getUserById(id) {
    const users = await this.userRepository.readUsersFromFile();
    return users.find((user) => String(user.id) === id);
  }

  async addUser(userData) {
    const users = await this.userRepository.readUsersFromFile();
    const usersToAdd = userData.map((user) => {
      const { email, name, age } = user;
      if (email && name && age) {
        return { id: uuidv4(), email, name, age };
      }
    });

    await this.userRepository.writeUsersToFile([...users, ...usersToAdd]);
    return usersToAdd;
  }

  async updateUser(userData, userId) {
    const users = await this.userRepository.readUsersFromFile();
    const user = users.find((user) => String(user.id) === userId);
    if (user) {
      const { name, email, age } = userData;
      if (name) user.name = name;
      if (email) user.email = email;
      if (age) user.age = age;
      await this.userRepository.writeUsersToFile(users);
      return user;
    } else {
      return null;
    }
  }

  async deleteUser(id) {
    const users = await this.userRepository.readUsersFromFile();
    const userIndex = users.findIndex((user) => String(user.id) === id);
    if (userIndex !== -1) {
      const [deletedUser] = users.splice(userIndex, 1);
      await this.userRepository.writeUsersToFile(users);
      return deletedUser;
    } else {
      return null;
    }
  }

  async getUsersByAge(age) {
    const users = await this.userRepository.readUsersFromFile();
    const parsedAge = parseInt(age, 10);
    const filteredUsers = users.filter((user) => user.age > parsedAge);
    return filteredUsers;
  }

  async getUsersByDomain(domain) {
    const users = await this.userRepository.readUsersFromFile();
    const filteredUsers = users.filter((user) => user.email.endsWith(domain));
    return filteredUsers;
  }
}

module.exports = UserService;
