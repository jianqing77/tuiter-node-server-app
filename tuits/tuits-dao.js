import tuitsModel from './tuits-model.js';

// implements the four basic CRUD operations for the tuits collection
// written in terms of the low level Mongoose model operations.
export const findTuits = () => tuitsModel.find();
export const createTuit = (tuit) => tuitsModel.create(tuit);
export const deleteTuit = (tid) => tuitsModel.deleteOne({ _id: tid });
export const updateTuit = (tid, tuit) =>
    tuitsModel.updateOne({ _id: tid }, { $set: tuit });
