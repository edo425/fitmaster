const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    age: { type: Number },
    gender: { type: String },
    weight: { type: Number }, // in kg
    height: { type: Number }, // in cm
    fitnessLevel: { type: String }, // e.g., Beginner, Intermediate, Advanced
    goal: { type: String }, // e.g., Cutting, Bulking, Maintenance
    weightHistory: [
        {
            weight: { type: Number },
            date: { type: Date, default: Date.now }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('User', UserSchema);
