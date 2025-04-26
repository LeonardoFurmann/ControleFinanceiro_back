import { PrismaClient } from "@prisma/client";
import {getTransactionsAmountByMonth } from '@prisma/client/sql'
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

const getAmountByMonth = async (userId, month) => {

    const amounts = await prisma.$queryRawTyped(getTransactionsAmountByMonth(userId, month))

    console.log(amounts)

    return amounts
}


const transactionModel = {
    postTransaction,
    getAmountByMonth
}

export default transactionModel