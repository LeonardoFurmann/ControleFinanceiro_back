const categoryModel = require("../models/categoryModel");
const userService = require("./userService");
const CustomError = require("../helpers/CustomError");

const getCategories = async () => {
    return await categoryModel.getCategories();
};

const getCategoryById = async (id) => {
    return await categoryModel.findCategoryById(id);
};

const getCategoryByDescription = async (userId, description, transactionTypeId) => {
    return await categoryModel.findCategory(userId, description, transactionTypeId);
};

const getCategoriesByUser = async (userId) => {
    await userService.verifyExistingUser(userId);
    return await categoryModel.findCategoriesByUser(userId);
};

const getCategoriesByTransactionType = async (transactionTypeId) => {
    return await categoryModel.findCategoriesByTransactionType(transactionTypeId);
};

const postCategory = async (category) => {
    await userService.verifyExistingUser(category.userId);
    await verifyCategory(category.userId, category.description, category.transactionTypeId);
    await categoryModel.postCategory(category);
};

const updateCategory = async (id, category) => {
    await userService.verifyExistingUser(category.userId);
    await verifyExistingCategory(id);
    await verifyCategoryNotId(id, category.userId, category.description, category.transactionTypeId);
    return await categoryModel.updateCategory(id, category);
};

const deleteCategory = async (id) => {
    await verifyExistingCategory(id);
    return await categoryModel.deleteCategory(id);
};

async function verifyExistingCategory(id) {
    const existingCategory = await categoryModel.findCategoryById(id);
    if (!existingCategory) {
        throw new CustomError("Categoria não encontrada", 404);
    } else {
        return existingCategory;
    }
}

async function verifyCategory(userId, description, transactionType) {
    const existingCategory = await categoryModel.findCategory(userId, description, transactionType);
    if (existingCategory) {
        throw new CustomError("Categoria já cadastrada.", 400);
    }
}

async function verifyCategoryNotId(id, userId, description, transactionType) {
    const existingCategory = await categoryModel.findCategoryNotId(id, userId, description, transactionType);
    if (existingCategory) {
        throw new CustomError("Esta descrição já está em uso por outra categoria", 400);
    }
}

const categoryService = {
    getCategories,
    getCategoryById,
    getCategoryByDescription,
    postCategory,
    updateCategory,
    deleteCategory,
    getCategoriesByUser,
    getCategoriesByTransactionType
};

module.exports = categoryService;
