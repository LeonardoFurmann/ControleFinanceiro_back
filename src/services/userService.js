const userModel = require("../models/userModel");

const getUsers = async() => {
    return await await userModel.findUserById(id);
}

const getUserById = async(id) => {
    return await verifyExistingUser(id);
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
    if (!existingUser) throw new Error("Usuário não encontrado")
}

async function verifyUserByEmail(email){
    const existingUser = await userModel.findUserByEmail(email);
    if (existingUser) throw new Error("Email já cadastrado.")
}

async function verifyUserByEmailNotId(id, email){
    const existingUser = await userModel.findUserByEmailNotId(id, email);
    if (existingUser) throw new Error("Este e-mail já está em uso por outro usuário")
}

const userService = {
    getUsers,
    getUserById,
    getUserByEmail,
    postUser,
    updateUser,
    deleteUser
};

module.exports = userService;