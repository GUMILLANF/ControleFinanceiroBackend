const { Schema } = require("mongoose");

module.exports = (app) => {
  let AccountSchema = app.db.mongoose.Schema({
    name: {
      type: String,
      required: [true, "é obrigatório"],
    },
    balance: {
      type: Number,
      required: [true, "é obrigatório"],
    },
  });

  app.db.mongoose.model("Accounts", AccountSchema);
};
