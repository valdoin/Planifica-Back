const Group = require('../models/Group');

const createGroup = async (req, res) => {
    try {
        const group = new Group(req.body);
        await group.save();
        res.status(201).send({ message: 'Group created successfully', group });
    } catch (error) {
        res.status(400).send({ error: 'Failed to create group', details: error.message });
    }
};

const getAllGroups = async (req, res) => {
    try {
        const groups = await Group.find();
        res.send(groups);
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch groups', details: error.message });
    }
};

const getGroupById = async (req, res) => {
    try {
        const group = await Group.findById(req.params.id)
        if (!group) {
            return res.status(404).send({ error: 'Group not found' });
        }
        res.send(group);
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch group', details: error.message });
    }
};

const updateGroup = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'length'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates' });
    }

    try {
        const group = await Group.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!group) {
            return res.status(404).send({ error: 'Group not found' });
        }

        res.send({ message: 'Group updated successfully', group });
    } catch (error) {
        res.status(400).send({ error: 'Failed to update group', details: error.message });
    }
};

const deleteGroup = async (req, res) => {
    try {
        const group = await Group.findByIdAndDelete(req.params.id);

        if (!group) {
            return res.status(404).send({ error: 'Group not found' });
        }

        res.send({ message: 'Group deleted successfully', group });
    } catch (error) {
        res.status(500).send({ error: 'Failed to delete group', details: error.message });
    }
};

module.exports = {
    createGroup,
    getAllGroups,
    getGroupById,
    updateGroup,
    deleteGroup,
};
