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

const validatePaymentMethod = (paymentMethod) => {
    const { description } = paymentMethod;

    if (!description || typeof description !== "string" || description.trim() === "") {
        throw new CustomError("O campo 'descrição' é obrigatório e deve ser um texto.", 400);
    }

    if (description.length < 3) {
        throw new CustomError("O campo 'descrição' deve ter no mínimo 3 caracteres.", 400);
    }
};

const validateCategory = (category) => {
    const { description, transactionTypeId } = category;

    if (!description || typeof description !== "string" || description.trim() === "") {
        throw new CustomError("O campo 'descrição' é obrigatório e deve ser um texto.", 400);
    }

    if (description.length < 3) {
        throw new CustomError("O campo 'descrição' deve ter no mínimo 3 caracteres.", 400);
    }

    if (!transactionTypeId || typeof transactionTypeId !== "number") {
        throw new CustomError("O campo 'tipo de transação' é obrigatório e deve ser um número.", 400);
    }

    if (![1, 2].includes(transactionTypeId)) {
        throw new CustomError("O campo 'tipo de transação' deve ser 1 (Entrada) ou 2 (Saída).", 400);
    }
};

module.exports = {validateUser, validatePaymentMethod, validateCategory}