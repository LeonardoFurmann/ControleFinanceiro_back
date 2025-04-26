import transactionService from "../services/transactionService.js";
import { validateTransaction } from "../helpers/validation.js";

const postTransaction = async (req, res) => {
    try{
        const userId = req.userId;
        const transaction = req.body;
        validateTransaction(transaction);
        await transactionService.postTransaction(userId, transaction);
        res.status(201).json({ message: "Transação cadastrado com sucesso." });
    } catch (error){
        res.status(error.statusCode || 500).json({ error: "Erro ao cadastrar uma transação: " + error.message });
    }
}

const getTransactionsByMonth = async (req, res) => {
    try{
        const userId = req.userId;
        const {month} = req.params;
       
        const transactionMonth =  await transactionService.getTransactionsByMonth(userId, month);

        res.status(201).json(transactionMonth);
    } catch (error){
        res.status(error.statusCode || 500).json({ error: "Erro ao buscar as transações por mês: " + error.message });
    }
}

const transactionController = {
    postTransaction,
    getTransactionsByMonth
}

export default transactionController