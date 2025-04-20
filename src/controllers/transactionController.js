import transactionService from "../services/transactionService.js";

const postTransaction = async (req, res) => {
    try{
        const userId = req.userId;
        const transaction = req.body;
        await transactionService.postTransaction(userId, transaction);
        res.status(201).json({ message: "Transação cadastrado com sucesso." });
    } catch (error){
        res.status(error.statusCode || 500).json({ error: "Erro ao cadastrar uma transação: " + error.message });
    }
}

const transactionController = {
    postTransaction,
}

export default transactionController