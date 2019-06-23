const mongoose = require('mongoose');

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
        roles: [String]
    },
    { 
        timestamps: { createdAt: 'dateCreated', updatedAt: 'dateLastModified' } 
    }
);

module.exports = mongoose.model('User', UserSchema); 