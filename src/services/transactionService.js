import transactionModel from "../models/transactionModel.js"

const postTransaction = async(userId, transaction) => {
    transactionModel.postTransaction(userId, transaction);
}

const transactionService = {
    postTransaction,
}

export default transactionService;