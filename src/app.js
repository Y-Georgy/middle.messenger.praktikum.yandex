const express = require('express');

const app = express();
const PORT = 3000;

app.use('/', express.static(`${__dirname}/../dist/`));
app.use('/login/', express.static(`${__dirname}/../dist/login/`));

app.listen(PORT, () => {
  console.log(`Сервер запущен на ${PORT} порту!`);
});