import categoryModel from "../models/categoryModel.js"
import CustomError from "../helpers/CustomError.js";

const getCategories = async (userId) => {
    const categories = await categoryModel.findCategoriesByUser(userId);
    return categories.map(e => toResponse(e));
};

const getCategoryById = async (userId, id) => {
    const category = await categoryModel.findCategoryById(userId, id);
    return toResponse(category);
};

const getCategoryByDescription = async (userId, description) => {
    const category = await categoryModel.findCategoryByDescription(userId, description);
    return toResponse(category);
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


function toResponse(category){
    return {
       id: category.id,
       description: category.description
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

