const express = require('express');
const router = express.Router();

//* Importing Controllers
//* Destructuring imported object to give each function it's own variable name.
const {
  getUsers,
  getUsersByID,
  // postNewUser,
  updateUser,
  deleteUser,
} = require('../controllers/usersControllers.js');

router.get('/', (req, res) =>
  res.send('<h1>Kick Up the Jams Mother Fucker!</h1>')
);

router.get('/users', getUsers);

router.get('/users/:id', getUsersByID);

// router.post('/users', postNewUser);

router.put('/users/:id', updateUser);

router.delete('/users/:id', deleteUser);

module.exports = router;
