const Student = require('../models/Student');

const createStudent = async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.status(201).send({ message: 'Student created successfully', student });
    } catch (error) {
        res.status(400).send({ error: 'Failed to create student', details: error.message });
    }
};

const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find().populate('tutor');
        res.send(students);
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch students', details: error.message });
    }
};

const getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id).populate('tutor');
        if (!student) {
            return res.status(404).send({ error: 'Student not found' });
        }
        res.send(student);
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch student', details: error.message });
    }
};

const updateStudent = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['surname', 'name', 'class', 'mail', 'tutor'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates' });
    }

    try {
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!student) {
            return res.status(404).send({ error: 'Student not found' });
        }

        res.send({ message: 'Student updated successfully', student });
    } catch (error) {
        res.status(400).send({ error: 'Failed to update student', details: error.message });
    }
};

const deleteStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);

        if (!student) {
            return res.status(404).send({ error: 'Student not found' });
        }

        res.send({ message: 'Student deleted successfully', student });
    } catch (error) {
        res.status(500).send({ error: 'Failed to delete student', details: error.message });
    }
};

module.exports = {
    createStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent,
};