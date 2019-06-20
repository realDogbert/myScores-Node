const ApiKey = require('../models/apiKeyModel');

function find() {
    return ApiKey.find();
}

function findById(id) {
    return ApiKey.findById(id);
}

function create(newApiKey) {
    const apiKey = new ApiKey(newApiKey);
    return apiKey.save();
}

function deleteById(id) {
    return ApiKey.findByIdAndDelete(id);
}

module.exports = { find, findById, create, deleteById };