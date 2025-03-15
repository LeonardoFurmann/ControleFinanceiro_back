const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CustomError = require("./CustomError");

const validateUser = (user) => {
    const {name, email, password} = user;

    if (!name || name.trim() === "") {
        throw new CustomError("O nome é obrigatório.", 400)
    }

    if (!email || email.trim() === "") {
        throw new CustomError("O campo 'email' é obrigatório.", 400);
    }

    if (!emailRegex.test(email)) {
        throw new CustomError("O campo email deve ser um endereço de e-mail válido.", 400);
    }

    if (!password || password.trim() === "") {
        throw new CustomError("O campo senha é obrigatório.", 400);
    }

    if (password.length < 6) {
        throw new CustomError("O campo senha deve ter no mínimo 6 caracteres.", 400);
    }
}


module.exports = {validateUser}