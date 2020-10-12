module.exports = (app) => {
  app.get("/accounts", app.controllers.accountsController.listAccounts);
  app.get("/accounts/:id", app.controllers.accountsController.findById);
  app.post("/accounts", app.controllers.accountsController.add);
  app.put(
    "/accounts/:id",
    app.controllers.accountsController.updateNameAccount
  );
  app.delete("/accounts/:id", app.controllers.accountsController.deleteAccount);
};
