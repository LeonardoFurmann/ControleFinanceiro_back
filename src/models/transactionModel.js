import { PrismaClient } from "@prisma/client";
import {getTransactionsAmountByMonth, getAllTransactionsByMonth, getAllTransactionsByYear } from '@prisma/client/sql'
const prisma = new PrismaClient();

const postTransaction = async (userId, transaction) => {
    return await prisma.transaction.create({
        data: { 
            date: new Date(transaction.date),
            amount: transaction.amount,
            categoryId: transaction.category,
            transactionTypeId: transaction.transactionType,
            paymentMethodId: transaction.paymentMethod,
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

const getTransactionsByYear = async (userId, startDate, endDate) => {  
    return await prisma.$queryRawTyped(getAllTransactionsByYear(userId, startDate, endDate))
}


const transactionModel = {
    postTransaction,
    getAmountByMonth,
    getTransactionsByMonth,
    getTransactionsByYear
}

export default transactionModel