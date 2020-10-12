module.exports = (app) => {
  app.use((req, res, next) => {
    if (req.originalUrl == "/users/login" || req.originalUrl == "/users/new") {
      next();
    } else {
      let token = req.headers.token;
      if (!token) res.status(401).send("Token não informado");
      else {
        app
          .get("jwt")
          .verify(token, process.env.JWT_CHAVE_PRIVADA, (err, decoded) => {
            if (err) res.status(401).send("Token inválido");
            else {
              req.decoded = decoded;
              console.log(req.decoded);
              next();
            }
          });
      }
    }
  });
};
