const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema(
    {
        type: String,
        value: String,
        description: String
    }
);

const RatingSchema = new mongoose.Schema(
    {
        type: String,
        value: Number
    }
);

const CourseSchema = new mongoose.Schema(
    {
        name: String,
        courseRating: [RatingSchema],
        slopeRating: [RatingSchema]
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
        courses: [CourseSchema],
        geometry: {
            location: {
                lat: Number,
                lng: Number
            }
        }
    },
    { 
        timestamps: { createdAt: 'dateCreated', updatedAt: 'dateLastModified' } 
    }
);

module.exports = mongoose.model('Golfclub', ClubSchema); 