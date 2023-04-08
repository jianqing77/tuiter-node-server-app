// load mongoose library
import mongoose from 'mongoose';
// load tuits schema
import tuitsSchema from './tuits-schema.js';

// create mongoose model from the schema
const tuitsModel = mongoose.model('TuitModel', tuitsSchema);

// export so it can be used elsewhere
export default tuitsModel;
