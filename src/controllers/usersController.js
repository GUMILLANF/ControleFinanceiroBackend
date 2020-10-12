module.exports = function (app) {
  let usersModel = app.db.mongoose.model("Users");

  return {
    listUsers: async function (req, res) {
      let users = await usersModel.find({});
      res.json(users);
    },

    add: async (req, res) => {
      try {
        let user = new usersModel(req.body);

        user.password = await app.utils.encryption.encrypt(user.password);
        if (await user.save()) {
          res.json(`Usuário adicionado com sucesso - Id: ${user.id}`).json();
        } else {
          res.status(500).json("Erro ao adicionar usuário");
        }
      } catch (error) {
        res.json("Erro ao adicionar usuário: " + error);
      }
    },

    findById: async (req, res) => {
      try {
        let _id = req.params.id;
        let user = await usersModel.findOne({ _id });
        if (user) res.json(user);
        else res.status(404).end();
      } catch (err) {
        res.status(404).json(err);
      }
    },

    updateUser: async (req, res) => {
      try {
        let id = req.params.id;
        let user = await usersModel.findById(id);
        user.name = req.body.name;
        user.email = req.body.email;
        if (req.body.password)
          user.password = await app.utils.encryption.encrypt(req.body.password);

        if (await user.save()) res.json(`Usuário ${id} alterado com sucesso`);
        else res.status(500).json(`Erro ao alterar: ${err}`);
      } catch (error) {
        res.json("Erro ao alterar usuário: " + error);
      }
    },

    deleteUser: async (req, res) => {
      try {
        let id = req.params.id;

        if (await usersModel.findByIdAndRemove(id))
          res.json(`Usuário ${id} removido com sucesso`);
        else res.status(500).json(`Erro ao remover: ${err}`);
      } catch (error) {
        res.json("Erro ao excluir usuário: " + error);
      }
    },

    login: async (req, res) => {
      try {
        let email = req.body.email,
          password = req.body.password;

        let user = await usersModel.findOne({ email });
        if (!user) res.status(404).json("Usuário não encontrado");
        else if (
          !(await app.utils.encryption.validate(password, user.password))
        )
          res.status(404).json("Senha inválida");
        else {
          let payload = {
            id: user._id,
            email,
          };
          let token = app
            .get("jwt")
            .sign(payload, process.env.JWT_CHAVE_PRIVADA, {
              expiresIn: 60 * 60 * 24,
            });
          res.json({
            token,
            user,
          });
        }
      } catch (error) {
        res.status(500).json(`Erro ao realizar login: ${error}`);
      }
    },
  };
};
