import transactionTypeModel from "../models/transactionTypeModel.js"


const getTransactionTypes = async() => {
    const transactionTypes =   await transactionTypeModel.getTransactionTypes();
    return transactionTypes.map(t => toResponse(t));
}

function toResponse(transactionType){
    return {
        id: transactionType.id,
        description: transactionType.description
    }
}


const transactionTypeService = {
    getTransactionTypes
}

export default transactionTypeService;