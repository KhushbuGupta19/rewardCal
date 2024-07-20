// Function to calculate rewards
export const calculateRewards = (transactions) => {
  const rewardPointsPerCustomer = {}; //per customer rewards

  transactions?.forEach((transaction) => {
    const { customerId, amount, date } = transaction; 
    const transactionDate = new Date(date);
    const month = transactionDate.getMonth() + 1; //month of transaction
    const year = transactionDate.getFullYear();  //year of transaction

    //check for the customer is exist or not in the table if no then create new record
    if (!rewardPointsPerCustomer[customerId]) {
      rewardPointsPerCustomer[customerId] = { transactions: [] };
    }

     //check for the year entry is exist or not of related cutomerID in the table if no then create new record
    if (!rewardPointsPerCustomer[customerId][year]) {
      rewardPointsPerCustomer[customerId][year] = { total: 0, months: {} };
    }

     //check for the Month of year entry is exist or not of related cutomerID in the table if no then create new record
    if (!rewardPointsPerCustomer[customerId][year].months[month]) {
      rewardPointsPerCustomer[customerId][year].months[month] = 0;
    }

    //calculating points
    let points = 0;
    if (amount > 100) {
      points += (amount - 100) * 2 + 50;
    } else if (amount > 50) {
      points += amount - 50;
    }

    //calculating total reward points
    rewardPointsPerCustomer[customerId][year].months[month] += points;
    rewardPointsPerCustomer[customerId][year].total += points;
    rewardPointsPerCustomer[customerId].transactions.push({
      year,
      month,
      amount,
      points,
    });
  });

  return rewardPointsPerCustomer;
};


//rendering the data in tabular form
export const renderRewardsData = (points) => {
  return Object.keys(points).flatMap((customerId) => {
    const customerPoints = points[customerId];
    const years = Object.keys(customerPoints).filter(key => key !== 'transactions');
    
    return years.flatMap((year) => {
      const yearData = customerPoints[year];
      const months = Object.keys(yearData.months);

      return months.map((month, index) => (
        <tr key={`${customerId}-${year}-${month}`}>
          {index === 0 && (
            <td rowSpan={months.length}>{customerId}</td>
          )}
          <td>{year}</td>
          <td>{month}</td>
          <td>{yearData.months[month]}</td>
          <td>{yearData.months[month]}</td>
          {index === 0 && (
            <td rowSpan={months.length}>{yearData.total}</td>
          )}
        </tr>
      ));
    });
  });


}