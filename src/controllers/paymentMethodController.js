import paymentMethodService from "../services/paymentMethodService.js";
import { validatePaymentMethod } from "../helpers/validation.js";

const getPaymentMethods = async (req, res) => {
    try {
        const userId = req.userId;
        const methods = await paymentMethodService.getPaymentMethods(userId);
        res.json(methods);
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: "Erro ao buscar métodos de pagamento: " + error.message });
    }
};

const getPaymentMethodById = async (req, res) => {
    try {
        const userId = req.userId;
        const {id} = req.params;
        const method = await paymentMethodService.getPaymentMethodById(userId, id);
        if (!method) {
            return res.status(404).json({ error: "Método de pagamento não encontrado" });
        }
        res.json(method);
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: "Erro ao buscar método de pagamento: " + error.message });
    }
};

const postPaymentMethod = async (req, res) => {
    try {
        const userId = req.userId;
        const paymentMethod = req.body;
        validatePaymentMethod(paymentMethod);
        await paymentMethodService.postPaymentMethod(userId, paymentMethod);
        res.status(201).json({ message: "Método de pagamento cadastrado com sucesso." });
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: "Erro ao cadastrar método de pagamento: " + error.message });
    }
};

const updatePaymentMethod = async (req, res) => {
    try {
        const userId = req.userId;
        const {id} = req.params;
        const paymentMethod = req.body;
        validatePaymentMethod(paymentMethod);
        const updatedMethod = await paymentMethodService.updatePaymentMethod(userId, id, paymentMethod);
        res.status(200).json(updatedMethod);
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: "Erro ao atualizar método de pagamento: " + error.message });
    }
};

const deletePaymentMethod = async (req, res) => {
    try {
        const userId = req.userId;
        const {id} = req.params;
        await paymentMethodService.deletePaymentMethod(userId, id);
        res.status(200).json({ message: "Método de pagamento deletado com sucesso." });
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: "Erro ao excluir método de pagamento: " + error.message });
    }
};

const paymentMethodController = {
    getPaymentMethods,
    getPaymentMethodById,
    postPaymentMethod,
    updatePaymentMethod,
    deletePaymentMethod,
};

export default paymentMethodController;