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

const findCategoryById = async (id) => {
    return await prisma.category.findUnique({
        where: { id: parseInt(id) },
    });
};

const postCategory = async (category) => {
    console.log(category)
    await prisma.category.create({
        data: {
            description: category.description,
            userId: category.userId,
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

