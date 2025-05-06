

function getAmountByCategory(transactions){
    
    const amountByCategory = transactions
        .reduce((acc, curr) => {       
            const existing = acc.find(item => item.category === curr.category);
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

function getAmountByDay(transactions){
    const amountByDay = transactions
        .reduce((acc, curr) => {
            const day = curr.date.toISOString().slice(0,10); 
            const existing = acc.find(item => item.day === dia)
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



const dashboardService = {
    getAmountByCategory,
    getAmountByDay
}

export default dashboardService;