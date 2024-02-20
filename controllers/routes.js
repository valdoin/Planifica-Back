const express = require('express');
const router = express.Router();
const teacherController = require('./teacherController');
const authController = require('./authController');
const studentController = require("./studentController");
const defenseController = require("./defenseController");

// Routes d'authentification
router.post('/login', authController.login);

// Routes pour les enseignants
router.post('/teachers/create', teacherController.createTeacher);
router.get('/teachers/list', teacherController.getAllTeachers);
router.get('/teachers/:id/details', teacherController.getTeacherById);
router.post('/teachers/:id/update', teacherController.updateTeacher);
router.delete('/teachers/:id/delete', teacherController.deleteTeacher);

// Routes pour les étudiants
router.post("/students/create", studentController.createStudent);
router.get("/students/list", studentController.getAllStudents);
router.get("/students/:id/details", studentController.getStudentById);
router.post("/students/:id/update", studentController.updateStudent);
router.delete("/students/:id/delete", studentController.deleteStudent);

// Routes pour les soutenances
router.post("/defenses/create", defenseController.createDefense);
router.get("/defenses/list", defenseController.getAllDefenses);
router.get("/defenses/:id/details", defenseController.getDefenseById);
router.post("/defenses/:id/update", defenseController.updateDefense);
router.delete("/defenses/:id/delete", defenseController.deleteDefense);

module.exports = router;
