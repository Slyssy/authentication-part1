const express = require('express');

require('dotenv').config();

const app = express();

const port = process.env.PORT || 8084;

//* middleware
app.use(express.json());
app.use(express.static('./public'));

//* Importing Routers and setting them to variables
const userRoutes = require('./src/routes/usersRoutes');
const authRoutes = require('./src/routes/authRoutes');

//* Using the route variables.
app.use(userRoutes);
app.use(authRoutes);

app.listen(port, () => {
  console.log('app is listening on:', port);
});
