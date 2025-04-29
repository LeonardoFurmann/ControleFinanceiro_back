import transactionModel from "../models/transactionModel.js"
import TransactionMonth from "../beans/TransactionMonth.js"

const postTransaction = async(userId, transaction) => {
    transactionModel.postTransaction(userId, transaction);
}

const getTransactionsByMonth = async( userId, year, month) => {
    
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);
    
    const amounts = await transactionModel.getAmountByMonth(userId, startDate, endDate);

    console.log(amounts);

    let transactionMonth  = new TransactionMonth();

}

const transactionService = {
    postTransaction,
    getTransactionsByMonth
}

export default transactionService;