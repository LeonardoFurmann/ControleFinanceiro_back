import { PrismaClient } from "@prisma/client";
import {getTransactionsAmountByMonth, getAllTransactionsByMonth } from '@prisma/client/sql'
const prisma = new PrismaClient();

const postTransaction = async (userId, transaction) => {
    return await prisma.transaction.create({
        data: { 
            date: new Date(transaction.date),
            amount: transaction.amount,
            categoryId: transaction.categoryId,
            transactionTypeId: transaction.transactionTypeId,
            paymentMethodId: transaction.paymentMethodId,
            userId,
        },
    });
};

const getAmountByMonth = async (userId, startDate, endDate) => {  
    return await prisma.$queryRawTyped(getTransactionsAmountByMonth(userId, startDate, endDate))
}

const getTransactionsByMonth = async (userId, startDate, endDate) => {  
    return await prisma.$queryRawTyped(getAllTransactionsByMonth(userId, startDate, endDate))
}


const transactionModel = {
    postTransaction,
    getAmountByMonth,
    getTransactionsByMonth
}

export default transactionModel