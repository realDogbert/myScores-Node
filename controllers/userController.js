const User = require('../models/userModel');


// get implementation of original userController
// controller.get = function(search, callback) {

//     var query = null;
//     if (search) {
//         query = {
//             name: { 
//                 $regex: search ,
//                 $options: "$i",
//             }
//         }
//     }

//     var options = {
//         sort: ["name"]
//     };

//     db.collection(collection).find(query, options).toArray(callback);

// }

function find(id) {
    
    if (!id) {
        return User.find();
    }
     
}

function findById(id) {
    return User.findById(id);
}

function create(newUser) {
    const user = new User(newUser);
    return user.save();
}

function update(user) {
    var query = {
        _id: user._id
    };
    return User.findOneAndUpdate(query, user, { new: true, useFindAndModify: false});
}

function deleteById(id) {
    return User.findByIdAndDelete(id);
}

module.exports = { create, find, findById, update, deleteById };