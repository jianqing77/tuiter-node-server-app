// load the mongoose library
import mongoose from 'mongoose';
// create the schema
const schema = mongoose.Schema(
    {
        tuit: String, // tuit property of type String
        likes: Number, // likes property of type Number
        liked: Boolean, // liked property of type Boolean
        handle: String,
        image: String,
        replies: Number,
        retuits: Number,
        time: String,
        title: String,
        topic: String,
        userName: String,
        disliked: Boolean,
        dislikes: Number,
    },
    // collection(table) name where tuits are stored in tuiter database
    { collection: 'tuits' }
);

// export schema so it can be used elsewhere
export default schema;
