const mongoose = require("mongoose");

const userSchema = new mongoose.Schema
(
    {
        name: 
        {
            type: String,
            required: true
        },

        email:
        {
            type: String,
            required: true,
            unique: true
        },

        password:
        {
            type: String,
            required: true
        },

        role:
        {
            type:String,
            enum: ["doctor", "patient"],
            required: true
        },

        //fields for profile section
        specialization:
        {
            type: String,
            default: "",
            //required: function() { return this.role === "doctor"; },
        },

        experience:
        {
            type: Number,
            default: 0,
            //required: function() { return this.role === "doctor"; },
        },

        phone: String,
        age: Number,
        gender: String,
        address: String,
        
        isProfileComplete: 
        {
            type: Boolean,
            default: false,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);