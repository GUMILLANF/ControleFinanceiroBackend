const accountsController = require("./accountsController");

module.exports = function (app) {
  let prModel = app.db.mongoose.model("PaymentsReceivements");
  let accountModel = app.db.mongoose.model("Accounts");
  let categoryModel = app.db.mongoose.model("Categories");

  return {
    listPR: async function (req, res) {
      let prs = await prModel.find({});
      res.json(prs);
    },

    add: async (req, res) => {
      try {
        let pr = new prModel();
        pr.title = req.body.title;
        pr.description = req.body.description;
        pr.value = req.body.value;
        pr.type = req.body.type;
        let account = await accountModel.findById(req.body.account._id);
        pr.account = await account;
        pr.category = await categoryModel.findById(req.body.category._id);

        if (await pr.save()) {
          try {
            if (pr.type == "R") account.balance += pr.value;
            else account.balance -= pr.value;

            if (!(await account.save()))
              res.status(500).json(`Erro ao alterar saldo da conta: ${err}`);
          } catch (error) {
            res.json("Erro ao alterar saldo da conta: " + error);
          }
          res.json(`Conta Pagar/Receber adicionado com sucesso - Id: ${pr.id}`);
        } else {
          res.status(500).json("Erro ao adicionar conta pagar/receber");
        }
      } catch (error) {
        res.json("Erro ao adicionar conta  pagar/receber: " + error);
      }
    },

    findById: async (req, res) => {
      try {
        let _id = req.params.id;
        let pr = await prModel.findOne({ _id });
        if (pr) res.json(pr);
        else res.status(404).end();
      } catch (err) {
        res.status(404).json(err);
      }
    },

    deletePR: async (req, res) => {
      try {
        let _id = req.params.id;
        let pr = await prModel.findOne({ _id });
        let account = await accountModel.findById(pr.account);

        if (await prModel.findByIdAndRemove(_id)) {
          try {
            if (pr.type == "R") account.balance -= pr.value;
            else account.balance += pr.value;

            if (!(await account.save()))
              res.status(500).json(`Erro ao alterar saldo da conta: ${err}`);
          } catch (error) {
            res.json("Erro ao alterar saldo da conta: " + error);
          }

          res.json(`Conta pagar/receber ${_id} removida com sucesso`);
        } else res.status(500).json(`Erro ao remover: ${err}`);
      } catch (error) {
        res.json("Erro ao excluir conta pagar/receber: " + error);
      }
    },
  };
};
