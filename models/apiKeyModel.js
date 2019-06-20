const mongoose = require('mongoose');

/**
 * ApiKey Schema
 */
const ApiKeySchema = new mongoose.Schema(
    {
        payload: {
            iss: {type: String, required: true },
            aud: {type: String, required: true}
        },
        token: { type: String, required: true }
    },
    { 
        collection: 'apiKeys',
        timestamps: { createdAt: 'dateCreated', updatedAt: 'dateLastModified' } 
    }
);

module.exports = mongoose.model('ApiKey', ApiKeySchema); 