const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());

const port = 3000;
const userRouter = require('./router/userRouter');

app.use(bodyParser.json());

app.use(userRouter);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
