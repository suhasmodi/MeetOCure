const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema(
{
    name:
    {
        type: String,
        required: true,
    },

    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number], 
        required: true,
      }
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

hospitalSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Hospital", hospitalSchema);