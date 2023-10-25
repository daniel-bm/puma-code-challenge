const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const userRouter = require('./router/userRouter');

app.use(bodyParser.json());

app.use(userRouter);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
