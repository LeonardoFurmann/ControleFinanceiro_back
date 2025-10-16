import transactionService from "../services/transactionService.js";
import { validateTransaction } from "../helpers/validation.js";
import CustomError from "../helpers/CustomError.js";

const postTransaction = async (req, res) => {
    try {
        const userId = req.userId;
        const transaction = req.body;
        validateTransaction(transaction);
        await transactionService.postTransaction(userId, transaction);
        res.status(201).json({ message: "Transação cadastrado com sucesso." });
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: "Erro ao cadastrar uma transação: " + error.message });
    }
}

const getTransactionsByMonth = async (req, res) => {
    try {
        const userId = req.userId;
        const { year, month } = req.query;

        if (!year) {
            throw new CustomError("Ano é obrigatório", 404);
        }

         if (!month) {
            throw new CustomError("Mês é obrigatório", 404);
        }

        const parsedYear = Number(year);
        const parsedMonth = Number(month);

        const transactionMonth = await transactionService.getTransactionsByMonth(userId, parsedYear, parsedMonth);

        res.status(200).json(transactionMonth);
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: "Erro ao buscar as transações por mês: " + error.message });
    }
}


const getTransactionsByYear = async (req, res) => {
    try {
        const userId = req.userId;
        const { year } = req.query;

        const parsedYear = Number(year);

        const transactionYear = await transactionService.getTransactionsByYear(userId, parsedYear);

        res.status(200).json(transactionYear);
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: "Erro ao buscar as transações por ano: " + error.message });
    }
}

const transactionController = {
    postTransaction,
    getTransactionsByMonth,
    getTransactionsByYear
}

export default transactionController