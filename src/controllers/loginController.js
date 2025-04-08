import loginService from "../services/loginService.js";
import {validateUser}  from "../helpers/validation.js";
import userService from "../services/userService.js";

const login = async (req, res) => {
    try{
        const login = req.body;
        //TODO login valitation
        await loginService.login(login);
        res.json("Login realizado com sucesso");
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: "Erro ao fazer o login: " + error.message });
    }
}

const register = async (req, res) => {
    try{
        const user = req.body;
        validateUser(user);
        await userService.postUser(user);
        res.status(201).json("Cadastro realizado com sucesso!!")
    } catch (error){
        res.status(error.statusCode || 500).json({error: "Ocorreu um erro ao registrar-se: " + error.message});
    }
}

const loginController = {
    login,
    register
};

export default loginController;
