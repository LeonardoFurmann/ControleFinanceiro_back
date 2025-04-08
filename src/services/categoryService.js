import categoryModel from "../models/categoryModel.js"
import userService from './userService.js'
import CustomError from "../helpers/CustomError.js";

const getCategories = async () => {
    return await categoryModel.getCategories();
};

const getCategoryById = async (id) => {
    return await categoryModel.findCategoryById(id);
};

const getCategoryByDescription = async (userId, description) => {
    return await categoryModel.findCategoryByDescription(userId, description);
};

const getCategoriesByUser = async (userId) => {
    await userService.verifyExistingUser(userId);
    return await categoryModel.findCategoriesByUser(userId);
};

const postCategory = async (category) => {
    await userService.verifyExistingUser(category.userId);
    await verifyCategory(category.userId, category.description);
    await categoryModel.postCategory(category);
};

const updateCategory = async (id, category) => {
    await userService.verifyExistingUser(category.userId);
    await verifyExistingCategory(id);
    await verifyCategory(category.userId, category.description, id);
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

async function verifyCategory(userId, description, id = null) {
    const existingCategory = await categoryModel.findCategoryByDescription(userId, description);
    if (existingCategory && (!id || existingCategory.id !== parseInt(id))) {
        throw new CustomError("Categoria já cadastrada.", 400);
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
};

export default categoryService;

