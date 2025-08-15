const EventPass = require('../models/EventPass');
const QRCode = require('qrcode');

const generateQRCode = async (text) => {
    try {
        return await QRCode.toDataURL(text);
    } catch (error) {
        throw new Error('Failed to generate QR code: ' + error.message);
    }
};

const createEventPass = async (req, res) => {
    const { userId, eventName, eventDate } = req.body;
    console.log('Received request body:', req.body); // Debug log
    try {
        if (!userId || !eventName || !eventDate) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const qrCode = await generateQRCode(`${userId}-${eventName}-${Date.now()}`);
        const eventPass = await EventPass.create({ userId, eventName, eventDate, qrCode });
        console.log('Event pass created:', eventPass); // Debug log
        res.status(201).json(eventPass);
    } catch (error) {
        console.error('Error creating event pass:', error);
        res.status(500).json({ message: 'Failed to save event pass', error: error.message });
    }
};

const getEventPasses = async (req, res) => {
    try {
        const eventPasses = await EventPass.find({ userId: req.user.id });
        res.status(200).json(eventPasses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateEventPass = async (req, res) => {
    try {
        const { id } = req.params;
        const { isValidated, attendanceLogged } = req.body;
        const eventPass = await EventPass.findById(id);
        if (!eventPass) return res.status(404).json({ message: 'Event pass not found' });

        if (isValidated !== undefined) eventPass.isValidated = isValidated;
        if (attendanceLogged !== undefined) eventPass.attendanceLogged = attendanceLogged;

        const updatedEventPass = await eventPass.save();
        res.json(updatedEventPass);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteEventPass = async (req, res) => {
    try {
        const { id } = req.params;
        const eventPass = await EventPass.findById(id);
        if (!eventPass) return res.status(404).json({ message: 'Event pass not found' });
        await eventPass.remove();
        res.json({ message: 'Event pass deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createEventPass, getEventPasses, updateEventPass, deleteEventPass };