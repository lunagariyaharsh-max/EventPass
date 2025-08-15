const mongoose = require('mongoose');

const eventPassSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    eventName: { type: String, required: true },
    eventDate: { type: Date, required: true },
    qrCode: { type: String, required: true, unique: true }, // Store QR code string
    isValidated: { type: Boolean, default: false },
    attendanceLogged: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('EventPass', eventPassSchema);