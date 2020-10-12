module.exports = (app) => {
  app.get("/users", app.controllers.usersController.listUsers);
  app.get("/users/:id", app.controllers.usersController.findById);
  app.post("/users/new", app.controllers.usersController.add);
  app.put("/users/:id", app.controllers.usersController.updateUser);
  app.delete("/users/:id", app.controllers.usersController.deleteUser);
  app.post("/users/login", app.controllers.usersController.login);
};
