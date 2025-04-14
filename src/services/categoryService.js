import categoryModel from "../models/categoryModel.js"
import CustomError from "../helpers/CustomError.js";

const getCategories = async (userId) => {
    return await categoryModel.findCategoriesByUser(userId);
};

const getCategoryById = async (userId, id) => {
    return await categoryModel.findCategoryById(userId, id);
};

const getCategoryByDescription = async (userId, description) => {
    return await categoryModel.findCategoryByDescription(userId, description);
};

const postCategory = async (userId, category) => {
    await verifyCategory(userId, category.description);
    await categoryModel.postCategory(userId, category);
};

const updateCategory = async (userId, id, category) => {
    await verifyExistingCategory(userId, id);
    await verifyCategory(userId, category.description, id);
    return await categoryModel.updateCategory(userId, id, category);
};

const deleteCategory = async (userId, id) => {
    await verifyExistingCategory(userId, id);
    return await categoryModel.deleteCategory(userId, id);
};

async function verifyExistingCategory(userId, id) {
    const existingCategory = await categoryModel.findCategoryById(userId, id);
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
};

export default categoryService;

