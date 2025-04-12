import userService from "../services/userService.js";
import CustomError from "../helpers/CustomError.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const JWT_SECRET =  process.env.JWT_SECRET

const login = async({email,password}) => {
    const user = await userService.getUserByEmail(email);
    let match = false

    if (user) {
        match = await bcrypt.compare(password, user.password);
    }

    if (!user || !match) {
        throw new CustomError("Senha ou email inválidos", 401)
    }

    const token = jwt.sign({userId: user.id}, JWT_SECRET, { expiresIn: '1h' });

    return token

}

const loginService = {
    login
};

export default loginService;
