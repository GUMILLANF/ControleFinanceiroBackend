const bcrypt = require("bcrypt");

module.exports = (app) => {
  return {
    encrypt: async (password) => {
      const salt = await bcrypt.genSalt(10);
      const password_encrypted = await bcrypt.hash(password, salt);
      return password_encrypted;
    },
    validate: async (password, password_encrypted) => {
      console.log(password);
      console.log(password_encrypted);
      return await bcrypt.compare(password, password_encrypted);
    },
  };
};
