import transactionModel from "../models/transactionModel.js"
import TransactionMonth from "../beans/TransactionMonth.js"
import { ENTRADA, SAIDA } from "../helpers/constants.js";
import dashboardService from "./dashboardService.js";

const postTransaction = async(userId, transaction) => {
    transactionModel.postTransaction(userId, transaction);
}

const getTransactionsByMonth = async( userId, year, month) => {
    
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);
 
    const amounts = await transactionModel.getAmountByMonth(userId, startDate, endDate);
    const amountIn = getAmountByType(amounts, ENTRADA)
    const amountOut = getAmountByType(amounts, SAIDA)
    const total =  amountIn - amountOut;

    let dashboard = {};
    let transactions = [];
    
    transactions = await transactionModel.getTransactionsByMonth(userId, startDate, endDate);
    
    dashboard.amountByCategory = dashboardService.getAmountByCategory(transactions);
    //dashboard.amountByCategoryOut = dashboardService.getAmountByCategory(transactions, SAIDA);
    //dashboard.amountByDayIn = dashboardService.getAmountByDay(transactions, ENTRADA);
    dashboard.amountByDay = dashboardService.getAmountByDay(transactions);

    const transactionMonth  = new TransactionMonth(amountIn, amountOut, total, dashboard, transactions);

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