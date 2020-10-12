module.exports = function (app) {
  let categoryModel = app.db.mongoose.model("Categories");

  return {
    listCategories: async function (req, res) {
      let categories = await categoryModel.find({});
      res.json(categories);
    },

    add: async (req, res) => {
      try {
        let category = new categoryModel(req.body);

        if (await category.save()) {
          res.json(`Categoria adicionado com sucesso - Id: ${category._id}`);
        } else {
          res.status(500).json("Erro ao adicionar categoria");
        }
      } catch (error) {
        res.json("Erro ao adicionar categoria: " + error);
      }
    },

    findById: async (req, res) => {
      try {
        let _id = req.params.id;
        let category = await categoryModel.findOne({ _id });
        if (category) res.json(category);
        else res.status(404).end();
      } catch (err) {
        res.status(404).json(err);
      }
    },

    updateCategory: async (req, res) => {
      try {
        let id = req.params.id;
        let category = await categoryModel.findById(id);
        category.name = req.body.name;
        category.type = req.body.type;

        if (await category.save())
          res.json(`Categoria ${id} alterado com sucesso`);
        else res.status(500).json(`Erro ao alterar: ${err}`);
      } catch (error) {
        res.json("Erro ao alterar categoria: " + error);
      }
    },

    deleteCategory: async (req, res) => {
      try {
        let id = req.params.id;

        if (await categoryModel.findByIdAndRemove(id))
          res.json(`Categoria ${id} removido com sucesso`);
        else res.status(500).json(`Erro ao remover: ${err}`);
      } catch (error) {
        res.json("Erro ao excluir categoria: " + error);
      }
    },
  };
};
