const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema (
{
    doctor:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true,
    },

    date:
    {
        type: "Date",
        required: true
    },

    availableSlots:
    [
        {
            type: String,
            required: true,
        },
    ],
},
{timestamps: true});

module.exports = mongoose.model("Slot", slotSchema);
