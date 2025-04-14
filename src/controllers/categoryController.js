import categoryService from "../services/categoryService.js";
import { validateCategory}  from "../helpers/validation.js";

const getCategories = async (req, res) => {
    try {
        const userId = req.userId;
        const categories = await categoryService.getCategories(userId);
        res.json(categories);
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: "Erro ao buscar categorias: " + error.message });
    }
};

const getCategoryById = async (req, res) => {
    try {
        const userId = req.userId;
        const {id} = req.params;
        const category = await categoryService.getCategoryById(userId, id);
        if (!category) {
            return res.status(404).json({ error: "Categoria não encontrada" });
        }
        res.json(category);
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: "Erro ao buscar categoria: " + error.message });
    }
};

const getCategoryByDescription = async (req, res) => {
    try {
        const userId = req.userId;
        const {description} = req.params;
        const category = await categoryService.getCategoryByDescription(userId, description);
        if (!category) {
            return res.status(404).json({ error: "Categoria não encontrada" });
        }
        res.json(category);
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: "Erro ao buscar categoria: " + error.message });
    }
};

const postCategory = async (req, res) => {
    try {
        const userId = req.userId;
        const category = req.body;
        validateCategory(category);
        await categoryService.postCategory(userId, category);
        res.status(201).json({message: "Categoria cadastrada com sucesso."});
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: "Erro ao cadastrar categoria: " + error.message });
    }
};

const updateCategory = async (req, res) => {
    try {
        const userId = req.userId;
        const {id} = req.params;
        const category = req.body;
        validateCategory(category);
        const updatedCategory = await categoryService.updateCategory(userId, id, category);
        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: "Erro ao editar a categoria: " + error.message });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const userId = req.userId;
        const {id} = req.params;
        await categoryService.deleteCategory(userId, id);
        res.status(200).json({message: "Categoria deletada com sucesso"});
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: "Erro ao deletar a categoria: " + error.message });
    }
};

const categoryController = {
    getCategories,
    getCategoryById,
    getCategoryByDescription,
    postCategory,
    updateCategory,
    deleteCategory,
};

export default categoryController;

