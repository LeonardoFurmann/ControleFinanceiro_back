
function getAmountByEachMonth(transactions) {
    const result = [];

    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const types = [1, 2];

    for (const month of months) {
        for (const type of types) {
            const total = transactions
                .filter(t => Number(t.month) === month && t.transactionType === type)
                .reduce((sum, t) => sum + Number(t.total), 0);

            result.push({
                month,
                type,
                total
            });
        }
    }

    return result;
}



const dashboardYearService = {
    getAmountByEachMonth
}

export default dashboardYearService;