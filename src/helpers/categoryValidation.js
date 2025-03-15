const CustomError = require("./CustomError");

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

module.exports = { validateCategory };
