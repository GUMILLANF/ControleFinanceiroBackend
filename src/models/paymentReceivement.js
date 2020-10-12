const { Schema } = require("mongoose");

module.exports = (app) => {
  let prSchema = app.db.mongoose.Schema({
    title: {
      type: String,
      required: [true, "é obrigatório"],
    },
    description: {
      type: String,
    },
    value: {
      type: Number,
      required: [true, "é obrigatório"],
    },
    type: {
      type: String,
      required: [true, "é obrigatório"],
    },
    account: {
      type: app.db.mongoose.Schema.Types.ObjectId,
      ref: "Accounts",
      required: [true, "é obrigatório"],
      index: true,
    },
    category: {
      type: app.db.mongoose.Schema.Types.ObjectId,
      ref: "Categories",
      required: [true, "é obrigatório"],
      index: true,
    },
  });

  app.db.mongoose.model("PaymentsReceivements", prSchema);
};
