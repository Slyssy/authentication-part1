const express = require('express');

require('dotenv').config();

const app = express();

const port = process.env.PORT || 4000;

//* middleware
app.use(express.json());
app.use(express.static('./public'));

//* Importing Routers
const userRoutes = require('./src/routes/usersRoutes');

app.use(userRoutes);
app.listen(port, () => {
  console.log('app is listening on:', port);
});
