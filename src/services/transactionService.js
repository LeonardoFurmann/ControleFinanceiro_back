import transactionModel from "../models/transactionModel.js"
import TransactionMounth from "../beans/TransactionMonth.js"

const postTransaction = async(userId, transaction) => {
    transactionModel.postTransaction(userId, transaction);
}

const getTransactionsByMonth = async( userId, month ) => {
    console.log(month)
    const amounts = await transactionModel.getAmountByMonth(userId, month);

    let transactionMouth  = new TransactionMounth();

}

const transactionService = {
    postTransaction,
    getTransactionsByMonth
}

export default transactionService;