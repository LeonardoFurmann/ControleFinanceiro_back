const userService = require("../services/userService")


const getUsers = async (req, res) => {
    try{
        const users = await userService.getUsers();
        res.json(users)
    } catch (error){
        res.status(500).json({error: "Erro ao buscar usuários"});
    }
}


const postUser = async (req, res) => {
    try{
        await userService.postUser(req.body);
        res.status(201)
    } catch (error){
        res.status(500).json({error: "Erro ao cadastrar usuário"});
    }
}


module.exports = { getUsers, postUser };