
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
router.get('/users', userController.getUsers);
router.get('/users/:id', userController.getUserById);
router.get('/users/email/:email', userController.getUserByEmail);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

//login
router.post('/login', loginController.login);
router.post('/register', loginController.register);

//category
router.get("/categories", verifyToken, categoryController.getCategories);
router.get("/category/:id", verifyToken, categoryController.getCategoryById);
router.get("/category/description/:description", verifyToken, categoryController.getCategoryByDescription);
router.post("/category", verifyToken, categoryController.postCategory);
router.put("/category/:id", verifyToken, categoryController.updateCategory);
router.delete("/category/:id", verifyToken, categoryController.deleteCategory);

//paymentMethod
router.get("/paymentmethods", verifyToken, paymentMethodController.getPaymentMethods);
router.get("/paymentmethods/:id", verifyToken, paymentMethodController.getPaymentMethodById);
router.post("/paymentmethods", verifyToken, paymentMethodController.postPaymentMethod);
router.put("/paymentmethods/:id", verifyToken, paymentMethodController.updatePaymentMethod);
router.delete("/paymentmethods/:id", verifyToken, paymentMethodController.deletePaymentMethod);

//transaction
router.post("/transaction", verifyToken, transactionController.postTransaction);
router.get("/transaction/month", verifyToken, transactionController.getTransactionsByMonth)
router.get("/transaction/year", verifyToken, transactionController.getTransactionsByYear)


export default router;