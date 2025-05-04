import transactionModel from "../models/transactionModel.js"
import TransactionMonth from "../beans/TransactionMonth.js"

const postTransaction = async(userId, transaction) => {
    transactionModel.postTransaction(userId, transaction);
}

const getTransactionsByMonth = async( userId, year, month) => {
    
    
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);
    
    const amounts = await transactionModel.getAmountByMonth(userId, startDate, endDate);
    
    const amountIn = getAmountByType(amounts, 1)
    const amountOut = getAmountByType(amounts, 2)
    const total =  amountIn - amountOut ;
    
    let transactionMonth  = new TransactionMonth(amountIn, amountOut, total);

    console.log(transactionMonth);

    return transactionMonth
}


function getAmountByType(amounts, type){

    const transactionAmount = amounts.find(a => a.transaction_type_id == type);
    const amount = transactionAmount ? transactionAmount.total : 0

    return Number(amount)

}

const transactionService = {
    postTransaction,
    getTransactionsByMonth
}

export default transactionService;