const db = require('../utils/db');

// * Creating a getUser controller function that will accept a request and a
// *  response object. It will return all the users with the fields defined by
// *  the query.
const getUsers = (req, res) => {
  // * Creating a variable that stores the value of the SQL query for this
  // *  getUsers route's call back function.
  // # Getting user ID, first name, last name and job title.
  const sqlQuery =
    'select user_id, first_name, last_name, job_title from users';
  db.query(sqlQuery, (err, rows) => {
    // * If there is an error, we want to send an error code and log the error.
    if (err) {
      console.log(`The "getUsers" query failed: ${err}`);
      res.sendStatus(500); // # Sending 500 because error was due to a problem  with the backend.
    } else {
      // * if no error, we want to send the data from the query.
      res.json(rows);
    }
  });
};

// * This function will take the request and response object and it will return
// *  a single user based on the id that provided by a path parameter submitted
// *  with the request.

// * If the id is not valid, the response will be "null", else the entire user
// *  will be returned in the response.
const getUsersByID = (req, res) => {
  // * Creating a variable to store the path parameter.
  // * We will use this in the sqlQuery below to make the query dynamic base on
  // *  the user's input.
  const userID = req.params.id;
  // * If userID is falsy (null, undefined, ''), which means the user is not
  // * sending an ID, send a 400 status code and exit the function.
  if (!userID) {
    res.sendStatus(400);
    return;
  }
  // * Storing the SQL query to a variable. This query will return the user ID,
  // *  first_name, last_name, job_title, email, phone, pay_rate, username, and
  // *  the user_password
  // * Using the userID variable to finalize the query.
  // # Using parameterized SQL statements.
  const sqlQuery = `select user_id, first_name, last_name, job_title, email, phone, pay_rate, username, user_password from users where user_id = ?`;
  // # Saving params array as a variable.
  const params = [userID];

  db.query(sqlQuery, params, (err, rows) => {
    // * If there is an error, we want to send an error code and log the error.
    if (err) {
      console.log(`The "getUsersByID" query failed: ${err}`);
      res.sendStatus(500); // # Sending 500 because error was due to a problem  with the backend.
    } else {
      // * If else statement to handle possible responses.
      // # If greater than 1 row returned...
      if (rows.length > 1) {
        console.log(
          'Something went wrong. More than 1 row was returned for id:',
          userID
        );
        res.sendStatus(500); //# Sending 500 because there is something wrong with the backend.
      }
      // # If no rows returned we will send back null to the client. Request is good, but there are no matching records.
      else if (rows.length === 0) {
        res.json(null);
      }
      // # Sending back the first record from the rows object to the client. If there is data the object will have a length of 1. The first record will be at index position 0.
      else {
        res.json(rows[0]);
      }
    }
  });
};

// * This function accepts a request and a response.

// * This request should include a json object that includes...
// * first_name, last_name, job_title, email, phone, pay_rate, username and
// * user_password.

// * The user id will be auto generated as per the mySQL schema.

// * Once the item is created we want to send a response that shows the new
// * object.
const postNewUser = (req, res) => {
  // # Using parameterized SQL statements.
  const sqlQuery =
    'insert into users (first_name, last_name, job_title, email, phone, pay_rate, username, user_password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  // # Saving params array as a variable. Each "?" above will be replaced in
  // # order by the items indicated in the array.
  const params = [
    req.body.firstName,
    req.body.lastName,
    req.body.jobTitle,
    req.body.email,
    req.body.phone,
    req.body.payRate,
    req.body.username,
    req.body.userPassword,
  ];

  db.query(sqlQuery, params, (err, rows) => {
    if (err) {
      console.log('The postNewUser route failed', err);
      res.sendStatus(500); // # Sending 500 because error likely will originate from the backend.
    } else {
      console.log('User Created: ', rows);
      const resSqlQuery = `select user_id, first_name, last_name, job_title, email, phone, pay_rate, username, user_password from users where user_id = ?`;
      const params = [rows.insertId];
      // * Running another query to return the entire object of the newly
      // * created user.
      db.query(resSqlQuery, params, (err, rows) => {
        // * If there is an error, we want to send an error code and log the error.
        if (err) {
          console.log(`The "create new user response" query failed: ${err}`);
          res.sendStatus(500); // # Sending 500 because error was due to a problem  with the backend.
        } else {
          // * If else statement to handle possible responses.
          // # If greater than 1 row returned...
          if (rows.length > 1) {
            console.log(
              'Something went wrong. More than 1 row was returned for id:',
              userID
            );
            res.sendStatus(500); //# Sending 500 because there is something wrong with the backend.
          }
          // # If no rows returned we will send back null to the client. Request is good, but there are no matching records.
          else if (rows.length === 0) {
            res.json(null);
          }
          // # Sending back the first record from the rows object to the client. If there is data the object will have a length of 1. The first record will be at index position 0.
          else {
            res.json(rows[0]);
          }
        }
      });
    }
  });
};

// * This function will take the request and response objects and it will
// * "update" a single user based on the path parameter submitted with the
// * request.

// * If the id is not valid, the response will be "null", else the we will run
// * the update query using parameterized SQL Statements.
const updateUser = (req, res) => {
  // * Creating a variable to store the path parameter.
  // * We will use this in the sqlQuery below to make the query dynamic base on
  // *  the user's input.
  const userID = req.params.id;
  console.log(userID);
  // * If userID is falsy (null, undefined, ''), which means the user is not
  // * sending an ID, send a 400 status code and exit the function.
  if (!userID) {
    console.log(`You got a stupid error.`);
    res.sendStatus(400);
    return;
  }
  // * Storing the SQL query to a variable.
  // # Using parameterized SQL statements.
  const sqlQuery = 'UPDATE users SET ? WHERE user_id = ?';
  // * Running the query using the req.body as a parameterized query.
  db.query(sqlQuery, [req.body, userID], (err, rows) => {
    if (err) {
      console.log(`The updateUser route was not successful: ${err}`);
      res.sendStatus(500); // # Sending 500 because error likely will originate from the backend.
    } else {
      // * Running another query that makes use of the user ID to show the
      // *  updated response object.
      const resSqlQuery = `select user_id, first_name, last_name, job_title, email, phone, pay_rate, username, user_password from users where user_id = ?`;
      // # Saving params array as a variable.
      const resParams = [userID];
      db.query(resSqlQuery, resParams, (err, rows) => {
        // * If there is an error, we want to send an error code and log the error.
        if (err) {
          console.log(`The "getUsersByID" query failed: ${err}`);
          res.sendStatus(500); // # Sending 500 because error was due to a problem  with the backend.
        } else {
          // * If else statement to handle possible responses.
          // # If greater than 1 row returned...
          if (rows.length > 1) {
            console.log(
              'Something went wrong. More than 1 row was returned for id:',
              userID
            );
            res.sendStatus(500); //# Sending 500 because there is something wrong with the backend.
          }
          // # If no rows returned we will send back null to the client. Request is good, but there are no matching records.
          else if (rows.length === 0) {
            res.json(null);
          }
          // # Sending back the first record from the rows object to the client. If there is data the object will have a length of 1. The first record will be at index position 0.
          else {
            res.json(rows[0]);
          }
        }
      });
    }
  });
};

// * This function will delete a user based on the client's request.

// * We will use the path parameter to confirm the user that needs to be
// * deleted.

// * We will send the response with the number of rows deleted.

const deleteUser = (req, res) => {
  // * Creating a variable to store the path parameter.
  // * We will use this in the sqlQuery below to make the query dynamic base on
  // *  the user's input.
  const userID = req.params.id;
  // * If userID is falsy (null, undefined, ''), which means the user is not
  // * sending an ID, send a 400 status code and exit the function.
  if (!userID) {
    res.sendStatus(400);
    return;
  }
  // * Storing the SQL query to a variable.
  // # Using parameterized SQL statements.
  const sqlQuery = 'DELETE FROM users WHERE user_id = ?';
  const params = [userID];
  db.query(sqlQuery, params, (err, rows) => {
    if (err) {
      console.log('The deleteUser route failed', err);
      res.sendStatus(500); // # Sending 500 because error likely will originate from the backend.
    } else {
      console.log(`Number of records deleted: ${rows.affectedRows}`);
      // * Sending the number of rows that have been deleted
      res.json(rows.affectedRows);
    }
  });
};

//* Exporting route functions
module.exports = {
  getUsers,
  getUsersByID,
  postNewUser,
  updateUser,
  deleteUser,
};
