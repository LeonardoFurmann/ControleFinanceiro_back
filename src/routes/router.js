
const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");
const categoryController = require("../controllers/categoryController");

router.get('/', (req, res)=> res.status(200).send('o router está funcionando.') )

//user
router.get('/usuarios', userController.getUsers);
router.get('/usuario/:id', userController.getUserById);
router.get('/usuario/email/:email', userController.getUserByEmail);
router.post('/usuario', userController.postUser);
router.put('/usuario/:id', userController.updateUser);
router.delete('/usuario/:id', userController.deleteUser);

//category
router.get("/categorias", categoryController.getCategories);
router.get("/categoria/:id", categoryController.getCategoryById);
router.get("/categorias/usuario/:userId", categoryController.getCategoriesByUser);
router.get("/categorias/transacao/:transactionTypeId", categoryController.getCategoriesByTransactionType);
//router.get("/categoria/descricao/:description", categoryController.getCategoryByDescription);
router.post("/categoria", categoryController.postCategory);
router.put("/categoria/:id", categoryController.updateCategory);
router.delete("/categoria/:id", categoryController.deleteCategory);


module.exports = router;