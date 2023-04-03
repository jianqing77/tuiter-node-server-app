import posts from './tuits.js';

let tuits = posts;

/**
 * create a new tuit based on the request body,
 * and then add it to the tuits array
 * http://localhost:4000/api/tuits
 */
const createTuit = (req, res) => {
    const newTuit = req.body; // extract new user from BODY in the request
    newTuit._id = new Date().getTime() + '';
    newTuit.likes = 0;
    newTuit.liked = false;
    tuits.push(newTuit); // append new Tuit to the tuit array
    res.json(newTuit); // respond new Tuit json to the client
};

/**
 * Return all the tuits in the tuits array.
 * http://localhost:4000/api/tuits
 */
const findTuits = (req, res) => {
    res.json(tuits);
};

/**
 * update the tuit with the specified tid parameter in the URL
 * based on the request body.
 */
const updateTuit = (req, res) => {
    const tarTuitId = req.params.tid;
    const updateContent = req.body;
    // tuits = tuits.map((t) => (t._id === tarTuitId ? { ...t, ...updateContent } : t));
    const tarIndex = tuits.findIndex((t) => t._id === tarTuitId);
    tuits[tarIndex] = { ...tuits[tarIndex], ...updateContent };
    res.sendStatus(200);
};

/**
 * Delete the tuit with the specified tid parameter in the URL
 */
const deleteTuit = (req, res) => {
    const tarTuitId = req.params.tid; // retrieve the ID of the tuit we want to remove
    tuits = tuits.filter((tuit) => tuit._id !== tarTuitId); // // filter out the tuit from the tuits array
    res.sendStatus(200);
};

const TuitsController = (app) => {
    app.post('/api/tuits', createTuit);
    app.get('/api/tuits', findTuits);
    app.put('/api/tuits/:tid', updateTuit);
    app.delete('/api/tuits/:tid', deleteTuit);
};

export default TuitsController;
