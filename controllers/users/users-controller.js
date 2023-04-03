import people from './users.js';

let users = people;

// separate to two functions

/******************************************************
 * Sending query parameters to a Web server
 *
 * use express instance app to declare HTTP GET
 * request pattern /api/users to call a function
 ******************************************************/
const findUsers = (req, res) => {
    // retrieve type parameter from query
    const type = req.query.type; // req.query['type']
    if (type) {
        const userOfType = users.filter((u) => u.type === type); // respond with users of that type
        res.json(userOfType); // return so it doesn't continue
        return;
    }
    // otherwise respond with all users
    res.json(users);
};
// query string parameters encoded at the end of a URL after a question mark (?)
// http://localhost:4000/api/users?type=STUDENT
// http://localhost:4000/api/users?type=FACULTY

/******************************************************
 * Sending path parameters to a Web server
 ******************************************************/
const findUserById = (req, res) => {
    const userId = req.params.uid; // get uid from REQUEST parameter map(the URL)
    const user = users.find((u) => u._id === userId); // find user in users array whose _id  matches userId retrieved from params
    res.json(user); // respond to client with user found
};
// http://localhost:4000/api/users/123

/******************************************************
 * Posting data to a Web server using Postman
 ******************************************************/
const createUser = (req, res) => {
    const newUser = req.body; // extract new user from BODY in request
    newUser._id = new Date().getTime() + ''; // add an _id property with unique timestamp
    users.push(newUser); // append new user to users array
    res.json(newUser); // respond with new user to client
};
// Under the URL select the Body tab, then raw, and then JSON from the Text dropdown.
// In the textarea that appears under the radio buttons, type a JSON object representing a new user object.

/******************************************************
 * Deleting data from a Web server using Postman
 ******************************************************/
const deleteUser = (req, res) => {
    const userId = req.params['uid']; // get target user ID from path parameter uid
    users = users.filter((u) => u._id !== userId); // filter out the user whose ID is the ID of the user we want to remove
    res.sendStatus(200); // respond with success code
};
// http://localhost:4000/api/users/234

/******************************************************
 * Updating data in a Web server with Postman
 ******************************************************/
const updateUser = (req, res) => {
    const tarUserId = req.params['uid']; // get target user ID from path parameter uid
    const updates = req.body; // gets updates for the user from the request body
    // uses map to iterate over the users array and update the user with the matching userId.
    // The spread operator (...): merge the existing user properties with the updated properties.
    // If the user ID does not match the userId parameter, the original user object is returned unchanged.
    users = users.map((u) => (u._id === tarUserId ? { ...u, ...updates } : u));
    res.sendStatus(200); // sends an HTTP status code of 200 (OK) back to the client
};

/**
 * function runs when /api/users requested
 * responds with JSON array of users
 */
const UserController = (app) => {
    // map path pattern to handler function
    app.get('/api/users', findUsers);
    app.get('/api/users/:uid', findUserById); // The colon (:) followed by uid declares a placeholder that matches any literal string
    app.post('/api/users', createUser); // Posting data to a Web server
    app.delete('/api/users/:uid', deleteUser); // delete data
    app.put('/api/users/:uid', updateUser); // update data
};

/*
 const userController = (app) => {
  app.get('/api/users', (req, res) => {
    res.json(users);
  });
};
 */

export default UserController;
