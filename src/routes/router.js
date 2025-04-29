
import express from 'express';
import userController from "../controllers/userController.js"
import categoryController from "../controllers/categoryController.js"
import paymentMethodController from "../controllers/paymentMethodController.js"
import transactionController from '../controllers/transactionController.js';
import loginController from "../controllers/loginController.js"
import { verifyToken } from '../helpers/middlewares.js';


const router = express.Router();
router.get('/', (req, res)=> res.status(200).send('o router está funcionando.') )

//user
//TODO ver o que retirar e talvez mudar pra profile
router.get('/usuarios', userController.getUsers);
router.get('/usuario/:id', userController.getUserById);
router.get('/usuario/email/:email', userController.getUserByEmail);
router.put('/usuario/:id', userController.updateUser);
router.delete('/usuario/:id', userController.deleteUser);

//login
router.post('/login', loginController.login);
router.post('/register', loginController.register);

//category
router.get("/categorias", verifyToken, categoryController.getCategories);
router.get("/categoria/:id", verifyToken, categoryController.getCategoryById);
router.get("/categoria/descricao/:description", verifyToken, categoryController.getCategoryByDescription);
router.post("/categoria", verifyToken, categoryController.postCategory);
router.put("/categoria/:id", verifyToken, categoryController.updateCategory);
router.delete("/categoria/:id", verifyToken, categoryController.deleteCategory);

//paymentMethod
router.get("/paymentmethods", verifyToken, paymentMethodController.getPaymentMethods);
router.get("/paymentmethods/:id", verifyToken, paymentMethodController.getPaymentMethodById);
router.post("/paymentmethods", verifyToken, paymentMethodController.postPaymentMethod);
router.put("/paymentmethods/:id", verifyToken, paymentMethodController.updatePaymentMethod);
router.delete("/paymentmethods/:id", verifyToken, paymentMethodController.deletePaymentMethod);

//transaction
router.post("/transaction", verifyToken, transactionController.postTransaction);
router.get("/transaction/month", verifyToken, transactionController.getTransactionsByMonth)
//router.get("/transaction/:year", verifyToken, transactionController.getTransactionsByYear)


export default router;