import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getPaymentMethods = async (userId) => {
    return await prisma.paymentMethod.findMany({
        where: { userId: userId}
    });
};

const findPaymentMethodById = async (userId, id) => {
    return await prisma.paymentMethod.findUnique({
        where: { 
            id: parseInt(id),
            userId: userId
        },
    });
};

const getPaymentMethodsByUser = async (userId) => {
    return await prisma.paymentMethod.findMany({
        where: { userId: parseInt(userId) },
    });
};

const postPaymentMethod = async (userId, paymentMethod) => {
    return await prisma.paymentMethod.create({
        data: { 
            description: paymentMethod.description,
            userId,
        },
    });
};

const updatePaymentMethod = async (userId, id, paymentMethod) => {
    return await prisma.paymentMethod.update({
        where: { id: parseInt(id), userId },
        data: { description: paymentMethod.description },
    });
};

const deletePaymentMethod = async (userId, id) => {
    return await prisma.paymentMethod.delete({
        where: { id: parseInt(id), userId},
    });
};

const findPaymentMethodByDescription = async (userId, description) => {
    return await prisma.paymentMethod.findFirst({
        where: { description, userId},
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
