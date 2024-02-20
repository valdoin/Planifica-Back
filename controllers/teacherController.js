const Teacher = require('../models/Teacher');

const createTeacher = async (req, res) => {
    try {
        const teacher = new Teacher(req.body);
        await teacher.save();
        res.status(201).send({ message: 'Teacher created successfully', teacher });
    } catch (error) {
        res.status(400).send({ error: 'Failed to create teacher', details: error.message });
    }
};

const getAllTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find();
        res.send(teachers);
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch teachers', details: error.message });
    }
};

const getTeacherById = async (req, res) => {
    try {
        const teacher = await Teacher.findById(req.params.id);
        if (!teacher) {
            return res.status(404).send({ error: 'Teacher not found' });
        }
        res.send(teacher);
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch teacher', details: error.message });
    }
};

const updateTeacher = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['surname', 'name', 'mail', 'disponibilities', 'isProgrammer']; 
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates' });
    }

    try {
        const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!teacher) {
            return res.status(404).send({ error: 'Teacher not found' });
        }

        res.send({ message: 'Teacher updated successfully', teacher });
    } catch (error) {
        res.status(400).send({ error: 'Failed to update teacher', details: error.message });
    }
};

const deleteTeacher = async (req, res) => {
    try {
        const teacher = await Teacher.findByIdAndDelete(req.params.id);

        if (!teacher) {
            return res.status(404).send({ error: 'Teacher not found' });
        }

        res.send({ message: 'Teacher deleted successfully', teacher });
    } catch (error) {
        res.status(500).send({ error: 'Failed to delete teacher', details: error.message });
    }
};

module.exports = {
    createTeacher,
    getAllTeachers,
    getTeacherById,
    updateTeacher,
    deleteTeacher,
};
