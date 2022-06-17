const mongoose = require('mongoose');

// Create the schema
const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: false
        },
        country: {
            type: String,
            required: false
        },
        region: {
            type: String,
            required: false
        },
        bio: {
            type: String,
            required: false
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        avatar: {
            type: String,
            required: false
        },
        dateCreated: {
            type: Date,
            required:true,
            default: Date.now 
        }
    }
)

// Create the model
const UserModel = mongoose.model('users', UserSchema);

// Export the model
module.exports = UserModel;