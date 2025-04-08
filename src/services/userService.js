import userModel from "../models/userModel.js";
import CustomError from "../helpers/CustomError.js";
import bcrypt from 'bcrypt'

const getUsers = async() => {
    return await userModel.getUsers();
}

const getUserById = async(id) => {
    return await userModel.findUserById(id);
}

const getUserByEmail = async (email) => {
    return await userModel.findUserByEmail(email);
};

const postUser = async(user) => {  
    await verifyUser(user.email);

    const hashPassword = await bcrypt.hash(user.password, 10);
    user.password = hashPassword;

    await userModel.postUser(user);
}

const updateUser = async(id, user) => {  
    await verifyExistingUser(id);
    await verifyUser(user.email, id)
    return await userModel.updateUser(id, user);
}

const deleteUser = async(id) => {  
    await verifyExistingUser(id);
    return await userModel.deleteUser(id);
}

async function verifyExistingUser(id){
    const existingUser = await userModel.findUserById(id);
    if (!existingUser) throw new CustomError("Usuário não encontrado", 404)
}

async function verifyUser(email , id = null){
    const existingUser = await userModel.findUserByEmail(email);
    if (existingUser && (!id || existingUser.id !== parseInt(id))) {
        throw new CustomError("Email já cadastrado.", 404)
    }
}

const userService = {
    getUsers,
    getUserById,
    getUserByEmail,
    postUser,
    updateUser,
    deleteUser,
    verifyExistingUser
};

export default userService;
