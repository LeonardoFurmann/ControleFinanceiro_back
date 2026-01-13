import transactionTypeService from "../services/transactionTypeService.js";


const getTransactionTypes = async (req, res) => {
    try{
        const transactionTypes = await transactionTypeService.getTransactionTypes();
        res.json(transactionTypes);
    }catch(error){
        res.status(error.statusCode || 500).json({error: "Erro ao buscar tipos de transação: " + error.messsage})
    }
}


const transactionTypeController = {
    getTransactionTypes
}

export default transactionTypeController;