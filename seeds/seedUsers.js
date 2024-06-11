const fs = require("fs").promises;
const shortid = require("shortid");
const config = require("../src/config/config");

const seedUsers = async () => {
  const user1Id = shortid.generate();
  const user2Id = shortid.generate();
  const user3Id = shortid.generate();

  const users = [
    {
      id: user1Id,
      name: "John Doe",
      email: "john.doe@example.com",
      age: 25,
      friends: [user2Id],
    },
    {
      id: user2Id,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      age: 30,
      friends: [user1Id],
    },
    {
      id: user3Id,
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      age: 35,
      friends: [],
    },
  ];

  try {
    await fs.writeFile(config.USERS_FILE, JSON.stringify(users, null, 2));
  } catch (err) {
    console.error("Error writing seed data", err);
  }
};

seedUsers();
