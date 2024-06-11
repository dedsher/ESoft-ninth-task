const express = require("express");
const config = require("./src/config/config");
const userRoutes = require("./src/routes/userRoutes");
const errorHandler = require("./src/middlewares/errorHandler");
const UserRepository = require("./src/repositories/userRepository");
const UserController = require("./src/controllers/userController");
const UserService = require("./src/services/userService");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
const PORT = config.PORT;

app.use(express.json());

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/users", userRoutes(userController));
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
