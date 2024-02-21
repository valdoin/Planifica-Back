const Teacher = require('../models/Teacher');
const nodemailer = require('nodemailer');
require('dotenv').config();

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

const sendMailToTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
            tls: {
                rejectUnauthorized:false,
            }
        });

        const teachersMails = teachers.map(teacher => teacher.mail);
        
        const mailOptions = {
            from: 'olivierandriko@gmail.com', 
            to: teachersMails, 
            subject: 'Planification des soutenances', 
            text: 'Veuillez saisir vos disponibilités pour les soutenances via ce lien :', 
        };

        await transporter.sendMail(mailOptions);

        res.send({ message: 'E-mail envoyé à tous les enseignants avec succès' });
    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'e-mail aux enseignants', error);
        res.status(500).send({ error: 'Failed to send email to teachers', details: error.message });
    }
};


module.exports = {
    createTeacher,
    getAllTeachers,
    getTeacherById,
    updateTeacher,
    deleteTeacher,
    sendMailToTeachers, 
};
