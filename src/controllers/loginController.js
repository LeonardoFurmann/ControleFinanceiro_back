const userService = require("../services/userService")
const userValidation = require("../helpers/validation");
const loginService = require("../services/loginService")

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
        userValidation.validateUser(user);
        await userService.postUser(user);
        res.status(201).json("Cadastro realizado com sucesso!!")
    } catch (error){
        res.status(error.statusCode || 500).json({error: "Ocorreu um erro ao registrar-se: " + error.message});
    }
}

const loginController = {
    login,
    register
}

module.exports = loginController;