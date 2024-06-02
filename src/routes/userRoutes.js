const { Router } = require('express');

module.exports = (userController) => {
  const router = Router();

  router.get('/', (req, res) => userController.getAllUsers(req, res));
  router.get("/:id", (req, res) => userController.getUserById(req, res));
  router.post("/", (req, res) => userController.addUser(req, res));
  router.put("/:id", (req, res) => userController.updateUser(req, res));
  router.delete("/:id", (req, res) => userController.deleteUser(req, res));
  router.get("/sorted", (req, res) => userController.getSortedUsers(req, res));
  router.get("/:age", (req, res) => userController.getUsersByAge(req, res));
  router.get("/:domain", (req, res) => userController.getUsersByDomain(req, res));

  return router;
};


