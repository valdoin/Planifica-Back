const Defense = require('../models/Defense');

const createDefense = async (req, res) => {
    try {
        const defense = new Defense(req.body);
        await defense.save();
        res.status(201).send({ message: 'Defense created successfully', defense });
    } catch (error) {
        res.status(400).send({ error: 'Failed to create defense', details: error.message });
    }
};

const getAllDefenses = async (req, res) => {
    try {
        const defenses = await Defense.find();
        res.send(defenses);
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch defenses', details: error.message });
    }
};

const getDefenseById = async (req, res) => {
    try {
        const defense = await Defense.findById(req.params.id);
        if (!defense) {
            return res.status(404).send({ error: 'Defense not found' });
        }
        res.send(defense);
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch defense', details: error.message });
    }
};

const updateDefense = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['date', 'classroom', 'student', 'tutor', 'candid'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates' });
    }

    try {
        const defense = await Defense.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!defense) {
            return res.status(404).send({ error: 'Defense not found' });
        }

        res.send({ message: 'Defense updated successfully', defense });
    } catch (error) {
        res.status(400).send({ error: 'Failed to update defense', details: error.message });
    }
};

const deleteDefense = async (req, res) => {
    try {
        const defense = await Defense.findByIdAndDelete(req.params.id);

        if (!defense) {
            return res.status(404).send({ error: 'Defense not found' });
        }

        res.send({ message: 'Defense deleted successfully', defense });
    } catch (error) {
        res.status(500).send({ error: 'Failed to delete defense', details: error.message });
    }
};

module.exports = {
    createDefense,
    getAllDefenses,
    getDefenseById,
    updateDefense,
    deleteDefense,
};
