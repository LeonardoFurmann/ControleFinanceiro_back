import paymentMethodModel from "../models/paymentMethodModel.js"
import CustomError from "../helpers/CustomError.js";

const getPaymentMethods = async () => {
    return await paymentMethodModel.getPaymentMethods();
};

const getPaymentMethodById = async (id) => {
    return await paymentMethodModel.getPaymentMethodById(id);
};

const postPaymentMethod = async (paymentMethod) => {
    await verifyPaymentMethod(paymentMethod.description);
    return await paymentMethodModel.postPaymentMethod(paymentMethod);
};

const updatePaymentMethod = async (id, paymentMethod) => {
    await verifyExistingPaymentMethod(id);
    await verifyPaymentMethod(paymentMethod.description, id);
    return await paymentMethodModel.updatePaymentMethod(id, paymentMethod);
};

const deletePaymentMethod = async (id) => {
    await verifyExistingPaymentMethod(id);
    return await paymentMethodModel.deletePaymentMethod(id);
};

async function verifyExistingPaymentMethod(id) {
    const existingMethod = await paymentMethodModel.getPaymentMethodById(id);
    if (!existingMethod) throw new CustomError("Método de pagamento não encontrado.", 404);
}

async function verifyPaymentMethod(description, id = null) {
    const existingMethod = await paymentMethodModel.findPaymentMethodByDescription(description);
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
