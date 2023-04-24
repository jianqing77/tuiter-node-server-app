import * as tuitsDao from '../../tuits/tuits-dao.js';
// import posts from './tuits.js';
// let tuits = posts;

/**
 * create a new tuit based on the request body,
 * and then add it to the tuits array
 * http://localhost:4000/api/tuits
 */
const createTuit = async (req, res) => {
    const newTuit = req.body; // extract new user from BODY in the request
    // newTuit._id = new Date().getTime() + ''; // ID created by database instead
    newTuit.likes = 0;
    newTuit.liked = false;
    newTuit.dislikes = 0;
    newTuit.disliked = false;
    newTuit.replies = 0;
    newTuit.retuits = 0;
    newTuit.time = 'just now';
    newTuit.topic = 'Personal';
    newTuit.title = 'Personal tuit';
    // tuits.push(newTuit); // append new Tuit to the tuit array // not using array anymore
    const insertedTuit = await tuitsDao.createTuit(newTuit); // actual tuit inserted in database with DAO's createTuit
    res.json(insertedTuit); // respond new Tuit json to the client
};

/**
 * Return all the tuits in the tuits array.
 * http://localhost:4000/api/tuits
 */
const findTuits = async (req, res) => {
    const tuits = await tuitsDao.findTuits(); // now it's asynchronous function
    res.json(tuits); // retrieve tuits from database
};

/**
 * update the tuit with the specified tid parameter in the URL
 * based on the request body.
 */
const updateTuit = async (req, res) => {
    const tuitdIdToUpdate = req.params.tid;
    const updates = req.body;
    const status = await tuitsDao.updateTuit(tuitdIdToUpdate, updates);
    res.json(status);
};

/**
 * Delete the tuit with the specified tid parameter in the URL
 */
const deleteTuit = async (req, res) => {
    const tuitdIdToDelete = req.params.tid;
    const status = await tuitsDao.deleteTuit(tuitdIdToDelete);
    res.json(status);
};

const TuitsController = (app) => {
    app.post('/api/tuits', createTuit);
    app.get('/api/tuits', findTuits);
    app.put('/api/tuits/:tid', updateTuit);
    app.delete('/api/tuits/:tid', deleteTuit);
};

export default TuitsController;
