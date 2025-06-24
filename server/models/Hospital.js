const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema(
{
    name:
    {
        type: String,
        required: true,
    },

    location:
    {
        city: {type: String},
        state:{type: String},
        coordinates: 
        {
            lat: {type: Number},
            lng: {type: Number},
        },
    },

    distance:
    {
        type: Number,
    },

    timeFromDevice:
    {
        type: String,
    },

    category:
    {
        type: String,
        enum: ['Hospital', "Clinic", "Specialized Care"],
        required: true,
    },

    departments: [String],

    rating:
    {
        type: Number,
        default: 0,
    },

    reviews:
    [
        {
            type: String,
        },
    ],
    doctors:
    [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
},
{timestamps: true}
);

module.exports = mongoose.model("Hospital", hospitalSchema);