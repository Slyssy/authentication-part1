const db = require('../utils/db');
const argon = require('argon2');

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

const login = () => {};

module.exports = {
  register,
  login,
};
