import { PrismaClient } from "@prisma/client";
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


const transactionModel = {
    postTransaction,
}

export default transactionModel