import loginService from "../services/loginService.js";
import {validateUser, validatelogin}  from "../helpers/validation.js";
import userService from "../services/userService.js";

const login = async (req, res) => {
    try{
        const login = req.body;
        validatelogin(login);
        const token = await loginService.login(login);
        res.status(200).json({message:"Login realizado com sucesso", token});
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: "Erro ao fazer o login: " + error.message });
    }
}

const register = async (req, res) => {
    try{
        const user = req.body;
        validateUser(user);
        await userService.postUser(user);
        res.status(201).json({message: "Cadastro realizado com sucesso!!"})
    } catch (error){
        res.status(error.statusCode || 500).json({error: "Ocorreu um erro ao registrar-se: " + error.message});
    }
}

const loginController = {
    login,
    register
};

export default loginController;
