const db = require('../utils/db');
const argon = require('argon2');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const position = req.body.position;
  const email = req.body.email;
  const phone = req.body.phone;
  const payRate = req.body.payRate;
  const username = req.body.username;
  const password = req.body.password;
  const organizationID = req.body.organizationID;

  //* Hashing the password using argon
  let passwordHash;
  try {
    passwordHash = await argon.hash(password);
  } catch (err) {
    console.log(`Something went wrong hashing the password: ${err}`);
    res.sendStatus(500); //* 500: Something wrong on the backend.
    return;
  }

  //* SQL query to add new user to users table.
  let sql =
    'INSERT INTO users (first_name, last_name, position, email, phone, pay_rate, user_name, password_hash, org_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);';

  //* Setting params for SQL query above
  const params = [
    firstName,
    lastName,
    position,
    email,
    phone,
    payRate,
    username,
    passwordHash,
    organizationID,
  ];

  //* Issuing SQL query to the database using a promise.
  try {
    let results = await db.queryPromise(sql, params);
    res.sendStatus(200); //* Everything went OK.
  } catch (err) {
    //* Checking for duplicates.
    if (err.code === 'ER_DUP_ENTRY') {
      res.status(400).send('User already exists.');
    } else {
      // * If there's an error and it's not a duplicate...
      console.log(
        `Something went wrong adding the user to the database: ${err}`
      );
      res.sendStatus(500); // * Something went wrong when attempting to add the user to the database. 500 because it was likely due to something on the backend.
      return;
    }
  }
};

const login = async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  //* SQL query to grab the password hash from the database
  let sql =
    'SELECT id, first_name, last_name, email, password_hash FROM users WHERE user_name = ?';

  let params = [username];

  let rows;
  try {
    rows = await db.queryPromise(sql, params);
  } catch (err) {
    console.log(`Failed to get user info: ${err}`);
    res.sendStatus(500); //* 500 because error had something to do with the backend.
    return;
  }
  if (rows.length >= 2) {
    console.log(`Got more than one row for the user: ${username}`);
    res.sendStatus(500);
    return;
  }
  if (rows.length === 0) {
    res.sendStatus(400);
    return;
  }
  const userID = rows[0].id;
  const passwordHash = rows[0].password_hash;
  const firstName = rows[0].first_name;
  const lastName = rows[0].last_name;
  const email = rows[0].email;

  //* Checking the password hash in the database against what was provided.
  let pass = false;
  try {
    pass = await argon.verify(passwordHash, password);
  } catch (err) {
    console.log(`Failed to verify password: ${err}`);
    pass = false;
  }

  if (pass) {
    let token = {
      username,
      userID,
      firstName,
      lastName,
      email,
    };
    let signedToken = jwt.sign(token, process.env.JWT_SECRET);
    res.send(signedToken);
  } else {
    res.sendStatus(403);
  }
};

module.exports = {
  register,
  login,
};
