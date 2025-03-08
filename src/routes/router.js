
const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");

router.get('/', (req, res)=> res.status(200).send('o router está funcionando.') )

router.get('/usuarios', userController.getUsers);
router.get('/usuario/:id', userController.getUserById);
router.get('/usuario/email/:email', userController.getUserByEmail);
router.post('/usuario', userController.postUser);
router.put('/usuario/:id', userController.updateUser);
router.delete('/usuario/:id', userController.deleteUser);

module.exports = router;