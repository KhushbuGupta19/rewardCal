//calculating Rewards points for each customer
export const calculateRewards = (transactions) => {
  const rewardPointsPerCustomer = {}
  transactions &&
    transactions.map((transaction) => {
      const { customerId, amount, date } = transaction
      //getting month from the Date of user transaction
      const month = new Date(date).getMonth() + 1

      //if no record is there related with customerId
      if (!rewardPointsPerCustomer[customerId]) {
        rewardPointsPerCustomer[customerId] = { total: 0, transactions: [] }
      }
      //if there is no date of transaction in record
      if (!rewardPointsPerCustomer[customerId][month]) {
        rewardPointsPerCustomer[customerId][month] = 0
      }

      let points = 0
      if (amount > 100) {
        //if amount of transaction is greater than 100
        points += (amount - 100) * 2 + 50
      } else if (amount > 50) {
        //if amount of transaction is greater than 50
        points += amount - 50
      }

      rewardPointsPerCustomer[customerId][month] += points //points calculated on the basis of month
      rewardPointsPerCustomer[customerId].total += points //total rewards points
      rewardPointsPerCustomer[customerId].transactions.push({
        month,
        amount,
        points,
      })
    })
  return rewardPointsPerCustomer
}

//Fetching the data in tabular form
export const renderRewardsData = (points) => {
  return Object.keys(points).flatMap((customerId) => {
    const customerPoints = points[customerId];
    const transactions = customerPoints.transactions;
    const firstRow = (
      <tr key={`${customerId}`}>
        <td rowSpan={transactions.length}>{customerId}</td>
        <td>{transactions[0].month}</td>
        <td>{transactions[0].amount}</td>
        <td>{transactions[0].points}</td>
        <td rowSpan={transactions.length}>{customerPoints.total}</td>
      </tr>
    );
    const otherRows = transactions.slice(1).map((transaction, index) => (
      <tr key={`${customerId}-${transaction.month}`}>
        <td>{transaction.month}</td>
        <td>{transaction.amount}</td>
        <td>{transaction.points}</td>
      </tr>
    ));
    return [firstRow, ...otherRows];
  });
};

