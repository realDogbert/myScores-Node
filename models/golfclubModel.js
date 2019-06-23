const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema(
    {
        type: String,
        value: String,
        description: String
    }
);

const CourseSchema = new mongoose.Schema(
    {
        name: String,
        courseRating: String,
        slope: String
    },
    { 
        timestamps: { createdAt: 'dateCreated', updatedAt: 'dateLastModified' } 
    }
);

const ClubSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: String,
        address: {
            street: String,
            zip: String,
            city: String,
            country: String
        },
        contacts: [ContactSchema],
        courses: [CourseSchema]
    },
    { 
        timestamps: { createdAt: 'dateCreated', updatedAt: 'dateLastModified' } 
    }
);

module.exports = mongoose.model('Golfclub', ClubSchema); 