const mongoose = require('mongoose');

/**
 * User Schema
 */
const UserSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        realName: { type: String, required: false }
    },
    { 
        timestamps: { createdAt: 'dateCreated', updatedAt: 'dateLastModified' } 
    }
);

module.exports = mongoose.model('User', UserSchema); 