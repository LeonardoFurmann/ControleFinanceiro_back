const paymentMethodModel = require("../models/paymentMethodModel");
const CustomError = require("../helpers/CustomError");

const getPaymentMethods = async () => {
    return await paymentMethodModel.getPaymentMethods();
};

const getPaymentMethodById = async (id) => {
    return await paymentMethodModel.getPaymentMethodById(id);
};

const postPaymentMethod = async (paymentMethod) => {
    await verifyPaymentMethodByDescription(paymentMethod.description);
    return await paymentMethodModel.postPaymentMethod(paymentMethod);
};

const updatePaymentMethod = async (id, paymentMethod) => {
    await verifyExistingPaymentMethod(id);
    await verifyPaymentMethodByDescription(paymentMethod.description, id);
    return await paymentMethodModel.updatePaymentMethod(id, paymentMethod);
};

const deletePaymentMethod = async (id) => {
    await verifyExistingPaymentMethod(id);
    return await paymentMethodModel.deletePaymentMethod(id);
};

async function verifyExistingPaymentMethod(id) {
    const existingMethod = await paymentMethodModel.getPaymentMethodById(id);
    if (!existingMethod) {
        throw new CustomError("Método de pagamento não encontrado.", 404);
    }
    return existingMethod;
}

async function verifyPaymentMethodByDescription(description, id = null) {
    const existingMethod = await paymentMethodModel.findPaymentMethodByDescription(description);
    if (existingMethod && (!id || existingMethod.id !== parseInt(id))) {
        throw new CustomError("Já existe um método de pagamento com essa descrição.", 400);
    }
}

module.exports = {
    getPaymentMethods,
    getPaymentMethodById,
    postPaymentMethod,
    updatePaymentMethod,
    deletePaymentMethod,
};
