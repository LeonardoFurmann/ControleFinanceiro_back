import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getCategories = async () => {
    return await prisma.category.findMany();
};

const findCategoriesByUser = async (userId) => {
    return await prisma.category.findMany({
        where: { userId: parseInt(userId) }
    });
};

const findCategoryById = async (userId, id) => {
    return await prisma.category.findUnique({
        where: { 
            id: parseInt(id),
            userId: userId,
         },
    });
};

const postCategory = async (userId, category) => {
    await prisma.category.create({
        data: {
            description: category.description,
            userId: userId,
        },
    });
};

const updateCategory = async (userId, id, category) => {
    return await prisma.category.update({
        where: { 
            id: parseInt(id),
            userId: userId
        },
        data: category,
    });
};

const deleteCategory = async (userId, id) => {
    return await prisma.category.delete({
        where: { 
            id: parseInt(id) ,
            userId: userId
        },
    });
};

const findCategoryByDescription = async (userId, description) => {
    return await prisma.category.findFirst({
        where: {
            userId: userId,
            description: description,
        }
    });
};

const categoryModel = {
    getCategories,
    findCategoriesByUser,
    findCategoryByDescription,
    findCategoryById,
    postCategory,
    updateCategory,
    deleteCategory,
};

export default categoryModel;

