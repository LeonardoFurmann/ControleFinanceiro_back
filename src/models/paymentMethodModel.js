import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getPaymentMethods = async () => {
    return await prisma.paymentMethod.findMany();
};

const findPaymentMethodById = async (id) => {
    return await prisma.paymentMethod.findUnique({
        where: { id: parseInt(id) },
    });
};

const getPaymentMethodsByUser = async (userId) => {
    return await prisma.paymentMethod.findMany({
        where: { userId: parseInt(userId) },
    });
};

const postPaymentMethod = async (paymentMethod) => {
    return await prisma.paymentMethod.create({
        data: { 
            description: paymentMethod.description ,
            userId: parseInt(paymentMethod.userId),
        },
    });
};

const updatePaymentMethod = async (id, paymentMethod) => {
    return await prisma.paymentMethod.update({
        where: { id: parseInt(id) },
        data: { description: paymentMethod.description },
    });
};

const deletePaymentMethod = async (id) => {
    return await prisma.paymentMethod.delete({
        where: { id: parseInt(id) },
    });
};

const findPaymentMethodByDescription = async (description) => {
    return await prisma.paymentMethod.findFirst({
        where: { description },
    });
};

const paymentMethodModel = {
    getPaymentMethods,
    getPaymentMethodsByUser,
    findPaymentMethodById,
    postPaymentMethod,
    updatePaymentMethod,
    deletePaymentMethod,
    findPaymentMethodByDescription,
};

export default paymentMethodModel;
