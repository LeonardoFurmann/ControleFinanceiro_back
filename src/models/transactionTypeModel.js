import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getTransactionTypes = async () =>{
    return await prisma.transactionType.findMany();
}


const transactionTypeModel = {
    getTransactionTypes
}

export default transactionTypeModel;