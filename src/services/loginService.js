const userService = require("../services/userService")
const CustomError = require("../helpers/CustomError");  // TODO module
const bcrypt = require('bcrypt');

const login = async({email,password}) => {
    const user = await userService.getUserByEmail(email);
    let match = false

    if (user) {
        match = await bcrypt.compare(password, user.password);
    }

    if (!user || !match) {
        throw new CustomError("Senha ou email inválidos", 401)
    }
}

const loginService = {
    login
}

module.exports = loginService;