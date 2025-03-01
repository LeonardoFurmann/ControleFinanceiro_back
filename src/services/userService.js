const userModel = require("../models/userModel");

const getUsers = async() => {
    return await userModel.getUsers();
}

const postUser = async(user) => {
    await userModel.postUser(user);
}

module.exports = { getUsers, postUser};