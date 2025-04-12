const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
import CustomError from './CustomError.js'

export const validateUser = (user) => {
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

export const validatePaymentMethod = (paymentMethod) => {
    const { description } = paymentMethod;

    if (!description || typeof description !== "string" || description.trim() === "") {
        throw new CustomError("O campo 'descrição' é obrigatório e deve ser um texto.", 400);
    }

    if (description.length < 3) {
        throw new CustomError("O campo 'descrição' deve ter no mínimo 3 caracteres.", 400);
    }
};

export const validateCategory = (category) => {
    const { description } = category;

    if (!description || typeof description !== "string" || description.trim() === "") {
        throw new CustomError("O campo 'descrição' é obrigatório e deve ser um texto.", 400);
    }

    if (description.length < 3) {
        throw new CustomError("O campo 'descrição' deve ter no mínimo 3 caracteres.", 400);
    }
};

export const validatelogin = ({email, password}) => {

    if (!email || typeof email !== "string" || email.trim() === "") {
        throw new CustomError("O campo email é obrigatório e deve ser um texto.", 400);
    }

    if (!password || password.trim() === "") {
        throw new CustomError("O campo senha deve ser preenchido", 400);
    }

    // if (!passwordRegex.test(password)) {
    //     throw new CustomError(
    //       "A senha deve conter no mínimo 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula, um número e um caractere especial.",
    //       400
    //     );
    // }
};



// if (!transactionTypeId || typeof transactionTypeId !== "number") {
//     throw new CustomError("O campo 'tipo de transação' é obrigatório e deve ser um número.", 400);
// }

// if (![1, 2].includes(transactionTypeId)) {
//     throw new CustomError("O campo 'tipo de transação' deve ser 1 (Entrada) ou 2 (Saída).", 400);
// }