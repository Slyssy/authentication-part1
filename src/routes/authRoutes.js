let express = require('express');

let router = express.Router();

//* Importing Controllers (Destructuring controller module exports object)
const { register, login } = require('../controllers/authController.js');
// console.log(register);

// * Defining Routes
router.post('/register', register);

router.post('/login', login);

module.exports = router;
