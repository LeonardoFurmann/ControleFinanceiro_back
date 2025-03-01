
const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");

router.get('/', (req, res)=> res.status(200).send('o router está funcionando.') )
router.get('/usuarios', userController.getUsers);
router.post('/usuario', userController.postUser);

module.exports = router;