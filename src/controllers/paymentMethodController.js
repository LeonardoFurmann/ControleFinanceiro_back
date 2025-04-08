import paymentMethodService from "../services/paymentMethodService.js";
import { validatePaymentMethod } from "../helpers/validation.js";

const getPaymentMethods = async (req, res) => {
    try {
        const userId = req.user.id; // Virá do token TODO autenticação
        const methods = await paymentMethodService.getPaymentMethods();
        res.json(methods);
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: "Erro ao buscar métodos de pagamento: " + error.message });
    }
};

const getPaymentMethodById = async (req, res) => {
    try {
        const { id } = req.params;
        const method = await paymentMethodService.getPaymentMethodById(id);
        if (!method) {
            return res.status(404).json({ error: "Método de pagamneto não encontrado" });
        }
        res.json(method);
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: "Erro ao buscar método de pagamento: " + error.message });
    }
};

const postPaymentMethod = async (req, res) => {
    try {
        const paymentMethod = req.body;
        validatePaymentMethod(paymentMethod);
        await paymentMethodService.postPaymentMethod(paymentMethod);
        res.status(201).json({ message: "Método de pagamento cadastrado com sucesso." });
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: "Erro ao cadastrar método de pagamento: " + error.message });
    }
};

const updatePaymentMethod = async (req, res) => {
    try {
        const { id } = req.params;
        const paymentMethod = req.body;
        validatePaymentMethod(paymentMethod);
        const updatedMethod = await paymentMethodService.updatePaymentMethod(id, paymentMethod);
        res.status(200).json(updatedMethod);
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: "Erro ao atualizar método de pagamento: " + error.message });
    }
};

const deletePaymentMethod = async (req, res) => {
    try {
        const { id } = req.params;
        await paymentMethodService.deletePaymentMethod(id);
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