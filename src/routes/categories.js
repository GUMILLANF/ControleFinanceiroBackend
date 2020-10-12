module.exports = (app) => {
  app.get("/categories", app.controllers.categoriesController.listCategories);
  app.get("/categories/:id", app.controllers.categoriesController.findById);
  app.post("/categories", app.controllers.categoriesController.add);
  app.put(
    "/categories/:id",
    app.controllers.categoriesController.updateCategory
  );
  app.delete(
    "/categories/:id",
    app.controllers.categoriesController.deleteCategory
  );
};
