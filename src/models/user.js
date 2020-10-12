module.exports = (app) => {
  let UserSchema = app.db.mongoose.Schema({
    name: {
      type: String,
      required: [true, "é obrigatório"],
    },
    email: {
      type: String,
      required: [true, "é obrigatório"],
      match: [/\S+@\S+\.\S+/, "é inválido"],
    },
    password: {
      type: String,
      required: [true, "é obrigatório"],
    },
  });

  app.db.mongoose.model("Users", UserSchema);
};
