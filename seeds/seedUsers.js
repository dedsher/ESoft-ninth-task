const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');
const config = require('../src/config/config');

const seedUsers = async () => {
  const users = [
    { id: uuidv4(), name: 'John Doe', email: 'john.doe@example.com', age: 25 },
    { id: uuidv4(), name: 'Jane Smith', email: 'jane.smith@example.com', age: 30 },
    { id: uuidv4(), name: 'Bob Johnson', email: 'bob.johnson@example.com', age: 35 },
  ];

  try {
    await fs.writeFile(config.USERS_FILE, JSON.stringify(users, null, 2));
  } catch (err) {
    console.error('Error writing seed data', err);
  }
};

seedUsers();