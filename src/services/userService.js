const shortid = require("shortid");

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async getAllUsers() {
    const users = await this.userRepository.readUsersFromFile();
    return users;
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
    const foundUser = users.find((user) => user.id === id);
    return foundUser;
  }

  async addUsers(usersData) {
    const users = await this.userRepository.readUsersFromFile();
    const usersToAdd = usersData.map((user) => {
      const { email, name, age } = user;
      if (email && name && age) {
        return { id: shortid.generate(), email, name, age, friends: [] };
      } else {
        null;
      }
    });

    usersToAdd.filter((user) => user !== null);

    if (usersToAdd.length === 0) {
      return [];
    }

    await this.userRepository.writeUsersToFile([...users, ...usersToAdd]);
    return usersToAdd;
  }

  async updateUser(userId, userData) {
    const users = await this.userRepository.readUsersFromFile();
    const user = users.find((user) => user.id === userId);
    console.log(userId);
    if (user) {
      const { name, age, email } = userData;
      if (name) user.name = name;
      if (email) user.email = email;
      if (age) user.age = age;
      await this.userRepository.writeUsersToFile(users);
      return user;
    }

    return null;
  }

  async deleteUser(id) {
    const users = await this.userRepository.readUsersFromFile();
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex !== -1) {
      const [deletedUser] = users.splice(userIndex, 1);
      await this.userRepository.writeUsersToFile(users);
      return deletedUser;
    }

    return null;
  }

  async getUsersByAge(age) {
    const users = await this.userRepository.readUsersFromFile();
    const filteredUsers = users.filter(
      (user) => parseInt(user.age) > parseInt(age)
    );
    return filteredUsers;
  }

  async getUsersByDomain(domain) {
    const users = await this.userRepository.readUsersFromFile();
    const filteredUsers = users.filter((user) => user.email.endsWith(domain));
    return filteredUsers;
  }

  async getUserFriends(id) {
    const users = await this.userRepository.readUsersFromFile();
    const user = users.find((user) => user.id === id);
    const friends = user.friends.map((friendId) =>
      users.find((user) => user.id === friendId)
    );
    return friends;
  }

  async addFriend(userId, friendId) {
    const users = await this.userRepository.readUsersFromFile();
    const user = users.find((u) => u.id === userId);
    const friend = users.find((u) => u.id === friendId);
    console.log(user, friend);

    if (!user || !friend) {
      return null;
    }

    if (!user.friends.includes(friendId)) {
      user.friends.push(friendId);
    }
    if (!friend.friends.includes(userId)) {
      friend.friends.push(userId);
    }

    await this.userRepository.writeUsersToFile(users);
    return user;
  }
}

module.exports = UserService;
