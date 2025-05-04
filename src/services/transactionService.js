import transactionModel from "../models/transactionModel.js"
import TransactionMonth from "../beans/TransactionMonth.js"
import { ENTRADA, SAIDA } from "../helpers/constants.js";

const postTransaction = async(userId, transaction) => {
    transactionModel.postTransaction(userId, transaction);
}

const getTransactionsByMonth = async( userId, year, month) => {
    
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);
    
    const amounts = await transactionModel.getAmountByMonth(userId, startDate, endDate);
    
    const amountIn = getAmountByType(amounts, ENTRADA)
    const amountOut = getAmountByType(amounts, SAIDA)
    const total =  amountIn - amountOut ;
    
    let transactionMonth  = new TransactionMonth(amountIn, amountOut, total);

    const transactions = await transactionModel.getTransactionsByMonth(userId, startDate, endDate);

    const amountCategoryIn =  getAmountByCategory(transactions, ENTRADA)
    const amountCategoryOut =  getAmountByCategory(transactions, SAIDA)

    transactionMonth.amountCategoryIn = amountCategoryIn
    transactionMonth.amountCategoryOut = amountCategoryOut

    const amountByDayIn = getAmountByDay(transactions, ENTRADA);
    const amountByDayOut = getAmountByDay(transactions, SAIDA);

    transactionMonth.amountByDay = amountByDayIn
    transactionMonth.amountByDayOut = amountByDayOut

    //transactionMonth.transactions = transactions

    return transactionMonth
}


function getAmountByType(amounts, type){
    const transactionAmount = amounts.find(a => a.transaction_type_id == type);
    const amount = transactionAmount ? transactionAmount.total : 0
    return Number(amount)
}

function getAmountByCategory(transactions, type){

    const amountByCategory = transactions
        .filter(t => t.transactionType === type)
        .reduce((acc, curr) => {
            acc[curr.category] = (acc[curr.category] || 0) + Number(curr.amount);
            return acc;
    }, {});

    console.log(amountByCategory)

   return amountByCategory;
}

function getAmountByDay(transactions, type){
    const amountByDay = transactions
        .filter(t => t.transactionType === type)
        .reduce((acc, curr) => {
            const dia = curr.date.toISOString().slice(0,10); 
            acc[dia] = (acc[dia] || 0) + Number(curr.amount);
            return acc;
        }, {});

    return amountByDay

}

const transactionService = {
    postTransaction,
    getTransactionsByMonth
}

export default transactionService;