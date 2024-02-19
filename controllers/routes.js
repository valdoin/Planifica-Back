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
router.patch('/teachers/:id/update', teacherController.updateTeacher);
router.delete('/teachers/:id/delete', teacherController.deleteTeacher);

// Routes pour les étudiants
router.route("/students/create").post(studentController.createStudent);
router.route("/students/list").get(studentController.getAllStudents);
router.route("/students/:id/details").get(studentController.getStudentById);
router.route("/students/:id/update").put(studentController.updateStudent);
router.route("/students/:id/delete").delete(studentController.deleteStudent);

// Routes pour les soutenances
router.route("/defenses/create").post(defenseController.createDefense);
router.route("/defenses/list").get(defenseController.getAllDefenses);
router.route("/defenses/:id/details").get(defenseController.getDefenseById);
router.route("/defenses/:id/update").put(defenseController.updateDefense);
router.route("/defenses/:id/delete").delete(defenseController.deleteDefense);

module.exports = router;
