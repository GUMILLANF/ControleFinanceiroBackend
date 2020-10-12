module.exports = function (app) {
  let accountModel = app.db.mongoose.model("Accounts");

  return {
    listAccounts: async function (req, res) {
      let accounts = await accountModel.find({});
      res.json(accounts);
    },

    add: async (req, res) => {
      try {
        let account = new accountModel(req.body);

        if (await account.save()) {
          res.json(`Conta adicionado com sucesso - Id: ${account._id}`);
        } else {
          res.status(500).json("Erro ao adicionar conta");
        }
      } catch (error) {
        res.json("Erro ao adicionar conta: " + error);
      }
    },

    findById: async (req, res) => {
      try {
        let _id = req.params.id;
        let account = await accountModel.findOne({ _id });
        if (account) res.json(account);
        else res.status(404).end();
      } catch (err) {
        res.status(404).json(err);
      }
    },

    updateNameAccount: async (req, res) => {
      try {
        let id = req.params.id;
        let account = await accountModel.findById(id);
        account.name = req.body.name;

        if (await account.save()) res.json(`Conta ${id} alterado com sucesso`);
        else res.status(500).json(`Erro ao alterar conta: ${err}`);
      } catch (error) {
        res.json("Erro ao alterar conta: " + error);
      }
    },

    deleteAccount: async (req, res) => {
      try {
        let id = req.params.id;

        if (await accountModel.findByIdAndRemove(id))
          res.json(`Conta ${id} removida com sucesso`);
        else res.status(500).json(`Erro ao remover: ${err}`);
      } catch (error) {
        res.json("Erro ao excluir conta: " + error);
      }
    },
  };
};
