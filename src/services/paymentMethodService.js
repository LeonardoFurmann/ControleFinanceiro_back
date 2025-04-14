import paymentMethodModel from "../models/paymentMethodModel.js"
import CustomError from "../helpers/CustomError.js";

const getPaymentMethods = async (userId) => {
    return await paymentMethodModel.getPaymentMethods(userId);
};

const getPaymentMethodById = async (userId, id) => {
    return await paymentMethodModel.findPaymentMethodById(userId, id);
};

const postPaymentMethod = async (userId, paymentMethod) => {
    await verifyPaymentMethod(userId, paymentMethod.description);
    return await paymentMethodModel.postPaymentMethod(userId, paymentMethod);
};

const updatePaymentMethod = async (userId, id, paymentMethod) => {
    await verifyExistingPaymentMethod(userId, id);
    await verifyPaymentMethod(userId, paymentMethod.description, id);
    return await paymentMethodModel.updatePaymentMethod(userId, id, paymentMethod);
};

const deletePaymentMethod = async (userId, id) => {
    await verifyExistingPaymentMethod(userId, id);
    return await paymentMethodModel.deletePaymentMethod(userId, id);
};

async function verifyExistingPaymentMethod(userId, id) {
    const existingMethod = await paymentMethodModel.findPaymentMethodById(userId, id);
    if (!existingMethod) throw new CustomError("Método de pagamento não encontrado.", 404);
}

async function verifyPaymentMethod(userId, description, id = null) {
    const existingMethod = await paymentMethodModel.findPaymentMethodByDescription(userId, description);
    if (existingMethod && (!id || existingMethod.id !== parseInt(id))) {
        throw new CustomError("Já existe um método de pagamento com essa descrição.", 400);
    }
}

const paymentMethodService = {
    getPaymentMethods,
    getPaymentMethodById,
    postPaymentMethod,
    updatePaymentMethod,
    deletePaymentMethod,
};

export default paymentMethodService;
