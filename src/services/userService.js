const userModel = require("../models/userModel");
const CustomError = require("../helpers/CustomError");

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
    await verifyUserByEmail(user.email);
    await userModel.postUser(user);
}

const updateUser = async(id, user) => {  
    await verifyUserByEmailNotId(id);
    await verifyUserByEmail(id, user.email)
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

async function verifyUserByEmail(email){
    const existingUser = await userModel.findUserByEmail(email);
    if (existingUser) throw new CustomError("Email já cadastrado.", 404)
}

async function verifyUserByEmailNotId(id, email){
    const existingUser = await userModel.findUserByEmailNotId(id, email);
    if (existingUser) throw new CustomError("Este e-mail já está em uso por outro usuário", 404)
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

module.exports = userService;