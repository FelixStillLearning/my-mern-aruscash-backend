const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Setiap email harus unik
    },
    password: {
        type: String,
        required: true,
    },
}, {
    timestamps: true, // Otomatis menambahkan createdAt dan updatedAt
});

const User = mongoose.model('User', userSchema);

module.exports = User;
