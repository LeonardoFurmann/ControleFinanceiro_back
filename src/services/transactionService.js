import transactionModel from "../models/transactionModel.js"
import TransactionMonth from "../beans/TransactionMonth.js"
import { IN, OUT } from "../helpers/constants.js";
import dashboardMonthService from "./dashboardMonthService.js";
import dashboardYearService from "./dashboardYearService.js";

const postTransaction = async(userId, transaction) => {
    transactionModel.postTransaction(userId, transaction);
}

const getTransactionsByMonth = async( userId, year, month) => {
    
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);

    const amounts = await transactionModel.getAmountByMonth(userId, startDate, endDate);
    const amountIn = getAmountByType(amounts, IN)
    const amountOut = getAmountByType(amounts, OUT)
    const total =  amountIn - amountOut;

    let dashboard = {};
    let transactions = [];
    
    transactions = await transactionModel.getTransactionsByMonth(userId, startDate, endDate);
    
    const amountByCategory = dashboardMonthService.getAmountByCategory(transactions);
    dashboard.amountByCategory = amountByCategory;
    dashboard.amountByDay = dashboardMonthService.getAmountByDay(transactions);
    dashboard.amountByPaymentMehod = dashboardMonthService.getAmountByPaymentMethod(transactions);
    dashboard.mostAmountCategory = dashboardMonthService.getMostAmountCategory(amountByCategory);

    const transactionMonth  = new TransactionMonth(amountIn, amountOut, total, dashboard, transactions);

    return transactionMonth
}

const getTransactionsByYear = async( userId, year) => {
    
    const startDate = new Date(year, 1, 1);
    const endDate = new Date(year, 12, 1);

    let transactionYear = {};
    let dashboard = {};
    
    const transactions = await transactionModel.getTransactionsByYear(userId, startDate, endDate);

    dashboard.amountByEachMonth = dashboardYearService.getAmountByEachMonth(transactions);
    
    transactionYear.dashbord = dashboard;

    return transactionYear;
}


function getAmountByType(amounts, type){
    const transactionAmount = amounts.find(a => a.transaction_type_id == type);
    const amount = transactionAmount ? transactionAmount.total : 0
    return Number(amount)
}

const transactionService = {
    postTransaction,
    getTransactionsByMonth,
    getTransactionsByYear
}

export default transactionService;