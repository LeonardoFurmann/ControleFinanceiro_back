const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateUser = (user) => {
    const {name, email, password} = user;

    if (!name || name.trim() === "") {
        throw new Error("O nome é obrigatório.")
    }

    if (!email || email.trim() === "") {
        throw new Error("O campo 'email' é obrigatório.");
    }

    if (!emailRegex.test(email)) {
        throw new Error("O campo email deve ser um endereço de e-mail válido.");
    }

    if (!password || password.trim() === "") {
        throw new Error("O campo senha é obrigatório.");
    }

    if (password.length < 6) {
        throw new Error("O campo senha deve ter no mínimo 6 caracteres.");
    }
}


module.exports = {validateUser}