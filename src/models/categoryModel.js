const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getCategories = async () => {
    return await prisma.category.findMany();
};

const findCategoryById = async (id) => {
    return await prisma.category.findUnique({
        where: { id: parseInt(id) },
    });
};

const postCategory = async (category) => {
    await prisma.category.create({
        data: {
            description: category.description,
            userId: category.userId,
            transactionTypeId: category.transactionTypeId,
        },
    });
};

const updateCategory = async (id, category) => {
    return await prisma.category.update({
        where: { id: parseInt(id) },
        data: category,
    });
};

const deleteCategory = async (id) => {
    return await prisma.category.delete({
        where: { id: parseInt(id) },
    });
};

const findCategory = async (userId, description, transactionTypeId) => {
    return await prisma.category.findFirst({
        where: {
            userId: userId,
            description: description,
            transactionTypeId: transactionTypeId,
        }
    });
};

const findCategoryNotId = async (id, userId, description, transactionTypeId) => {
    return await prisma.category.findFirst({
        where: {
            userId: userId,
            description: description,
            transactionTypeId: transactionTypeId,
            id: { not: parseInt(id) }
        },
    });
};

const findCategoriesByUser = async (userId) => {
    return await prisma.category.findMany({
        where: { userId: parseInt(userId) }
    });
};

const findCategoriesByTransactionType = async (transactionTypeId) => {
    return await prisma.category.findMany({
        where: { transactionTypeId: parseInt(transactionTypeId) }
    });
};

const categoryModel = {
    getCategories,
    postCategory,
    findCategory,
    updateCategory,
    findCategoryNotId,
    findCategoryById,
    deleteCategory,
    findCategoriesByUser,
    findCategoriesByTransactionType
};

module.exports = categoryModel;
