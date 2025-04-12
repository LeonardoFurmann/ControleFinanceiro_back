
import express from 'express';
import userController from "../controllers/userController.js"
import categoryController from "../controllers/categoryController.js"
import paymentMethodController from "../controllers/paymentMethodController.js"
import loginController from "../controllers/loginController.js"
import { veritfyToken } from '../helpers/middlewares.js';


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
router.get("/categorias", veritfyToken, categoryController.getCategories);
router.get("/categoria/:id", categoryController.getCategoryById);
//router.get("/categoria/descricao/:description", categoryController.getCategoryByDescription);
router.post("/categoria", categoryController.postCategory);
router.put("/categoria/:id", categoryController.updateCategory);
router.delete("/categoria/:id", categoryController.deleteCategory);


//paymentMethod
router.get("/paymentmethods", paymentMethodController.getPaymentMethods);
router.get("/paymentmethods/:id", paymentMethodController.getPaymentMethodById);
router.post("/paymentmethods", paymentMethodController.postPaymentMethod);
router.put("/paymentmethods/:id", paymentMethodController.updatePaymentMethod);
router.delete("/paymentmethods/:id", paymentMethodController.deletePaymentMethod);



export default router;