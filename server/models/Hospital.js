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
        type: String,
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