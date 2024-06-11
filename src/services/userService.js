class UserService {
  constructor(UserRepository) {
    this.userRepository = UserRepository;
  }

  async getAllUsers() {
    const users = await this.userRepository.getAllUsers();
    return users;
  }

  async getSortedUsers() {
    const users = await this.userRepository.getAllUsers();

    users.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });

    return users;
  }

  async getUserById(id) {
    const users = await this.userRepository.getAllUsers();
    const user = users.find((user) => user.id === id);
    return user;
  }

  async addUser(usersData) {
    const user = await this.userRepository.addUser(usersData);
    return user;
  }

  async updateUser(id, userData) {
    const user = await this.userRepository.updateUser(id, userData);
    return user;
  }

  async deleteUser(id) {
    const user = await this.userRepository.deleteUser(id);
    return user;
  }

  async getUsersByAge(age) {
    const users = await this.userRepository.getAllUsers();
    const filteredUsers = users.filter(
      (user) => parseInt(user.age) > parseInt(age)
    );
    return filteredUsers;
  }

  async getUsersByDomain(domain) {
    const users = await this.userRepository.getAllUsers();
    const filteredUsers = users.filter((user) => user.email.endsWith(domain));
    return filteredUsers;
  }

  async getUserFriends(id) {
    const users = await this.userRepository.getAllUsers();
    const user = users.find((user) => user.id === id);
    const friends = user.friends.map((friendId) =>
      users.find((user) => user.id === friendId)
    );
    return friends;
  }

  async addFriend(userId, friendId) {
    const user = await this.userRepository.addFriend(userId, friendId);
    return user;
  }
}

module.exports = UserService;
