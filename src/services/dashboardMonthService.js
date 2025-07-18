

function getAmountByCategory(transactions){ 
    const amountByCategory = transactions
        .reduce((acc, curr) => {       
            const existing = acc.find(item => item.category === curr.category &&
                                              item.type === curr.transactionType);
            if (existing) {
                existing.amount += Number(curr.amount);
            } else {
                acc.push({ 
                    category: curr.category, 
                    amount: Number(curr.amount),
                    type: curr.transactionType 
                });
            }

            return acc;
    }, []);

   return amountByCategory;
}

function getAmountByPaymentMethod(transactions){ 
    const amountByPaymentMethod = transactions
        .reduce((acc, curr) => {       
            const existing = acc.find(item => item.paymentMethod === curr.paymentMethod &&
                                              item.type === curr.transactionType
            );
            if (existing) {
                existing.amount += Number(curr.amount);
            } else {
                acc.push({ 
                    paymentMethod: curr.paymentMethod, 
                    amount: Number(curr.amount),
                    type: curr.transactionType
                });
            }

            return acc;
    }, []);

   return amountByPaymentMethod;
}

function getAmountByDay(transactions){
    const amountByDay = transactions
        .reduce((acc, curr) => {
            const day = curr.day;
            const existing = acc.find(item => item.day === day &&
                                              item.type === curr.transactionType)
            if (existing) {
                existing.amount +=Number(curr.amount);
            } else {
                acc.push({
                    day: day,
                    amount: Number(curr.amount),
                    type: curr.transactionType
                })
            }
            return acc;
        }, []);

    return amountByDay

}

function getMostAmountCategory(amountByCategory){  
    let biggestAmount = 0;
    let category;

    amountByCategory.forEach(a => {      
        if (a.amount > biggestAmount) {
            biggestAmount = a.amount
            category = a.category
        }                 
    });

    const mostAmountCategory = {
        amount: biggestAmount,
        category: category
    }

    return mostAmountCategory;  
}



const dashboardMonthService = {
    getAmountByCategory,
    getAmountByDay,
    getAmountByPaymentMethod,
    getMostAmountCategory
}

export default dashboardMonthService;