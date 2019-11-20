const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({

    createdOn: {
        type: Date,
        default: Date.now,
        required: true
    },
    organizationId: { 
        type: String,
        required: true
    },
    role: {
        type: String 
    },
//all information from google
    userId: {
        type: String
    },
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    picture: {
        type: String
    },
});

module.exports = mongoose.model("User", UserSchema);