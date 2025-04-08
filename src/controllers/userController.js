import userService from "../services/userService.js";
import {validateUser} from "../helpers/validation.js";

const getUsers = async (req, res) => {
    try{
        const users = await userService.getUsers();
        res.json(users)
    } catch (error){
        res.status(error.statusCode || 500).json({error: "Erro ao buscar usuários: " + error.message});
    }
}

const getUserById = async (req, res) => {
    try{
        const { id } = req.params;
        const user = await userService.getUserById(id);
        if (!user) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }
        res.json(user);
    } catch (error){
        res.status(error.statusCode || 500).json({error: "Erro ao buscar usuário: " + error.message});
    }
}

const getUserByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const user = await userService.getUserByEmail(email);
        if (!user) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }
        res.json(user);
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: "Erro ao buscar usuário: " + error.message });
    }
};

const updateUser = async (req ,res) =>{
    try {
        const { id } = req.params;
        const user = req.body;
        validateUser(user);
        const updatedUser = await userService.updateUser(id, user);    
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(error.statusCode || 500).json({error: "Erro ao editar o usuário: " + error.message})
    }
}

const deleteUser = async (req ,res) =>{
    try {
        const { id } = req.params;
        await userService.deleteUser(id);    
        res.status(200).json("Usuário deletado com sucesso");
    } catch (error) {
        res.status(error.statusCode || 500).json({error: "Erro ao editar o usuário: " + error.message})
    }
}


const userController = {
    getUsers,
    getUserById,
    getUserByEmail,
    updateUser,
    deleteUser
};

export default userController;
