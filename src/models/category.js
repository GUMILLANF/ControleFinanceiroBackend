module.exports = (app) => {
  let CategorySchema = app.db.mongoose.Schema({
    name: {
      type: String,
      required: [true, "é obrigatório"],
    },
    type: {
      type: String,
      required: [true, "é obrigatório"],
    },
  });

  app.db.mongoose.model("Categories", CategorySchema);
};
