module.exports = (app) => {
  app.get("/pr", app.controllers.paymentsReceivementsController.listPR);
  app.get("/pr/:id", app.controllers.paymentsReceivementsController.findById);
  app.post("/pr", app.controllers.paymentsReceivementsController.add);
  app.delete(
    "/pr/:id",
    app.controllers.paymentsReceivementsController.deletePR
  );
};
