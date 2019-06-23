const mongoose = require('mongoose');

const ChanngeSchema = new mongoose.Schema(
    {
        oldHandicap: Number,
        newHandicap: Number
    },
    {
        timestamps: { createdAt: 'dateCreated', updatedAt: 'dateLastModified' } 
    }
);

/**
 * User Schema
 */
const UserSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        realName: { type: String, required: false },
        handicap: { type: Number, required: false },
        isAdmin: { type: Boolean, default: false, required: true},
        changes: [ChanngeSchema]
    },
    { 
        timestamps: { createdAt: 'dateCreated', updatedAt: 'dateLastModified' } 
    }
);

module.exports = mongoose.model('User', UserSchema); 