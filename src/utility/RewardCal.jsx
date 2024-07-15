//calculating Rewards points for each customer
export const calculateRewards = (transactions) => {
  const rewardPointsPerCustomer = {}
  transactions.forEach((transaction) => {
    const { customerId, amount, date } = transaction
    const month = new Date(date).getMonth() + 1

    if (!rewardPointsPerCustomer[customerId]) {
      rewardPointsPerCustomer[customerId] = { total: 0, transactions: [] }
    }

    if (!rewardPointsPerCustomer[customerId][month]) {
      rewardPointsPerCustomer[customerId][month] = 0
    }

    let points = 0
    if (amount > 100) {
      points += (amount - 100) * 2 + 50
    } else if (amount > 50) {
      points += amount - 50
    }

    rewardPointsPerCustomer[customerId][month] += points
    rewardPointsPerCustomer[customerId].total += points
    rewardPointsPerCustomer[customerId].transactions.push({
      month,
      amount,
      points,
    })
  })

  // console.log('Calculated Points:', rewardPointsPerCustomer);
  return rewardPointsPerCustomer
}

//Fetching the data in tabular form
export const renderRewardsData = (points) => {
  const rows = []
  for (const customerId in points) {
    const customerPoints = points[customerId]
    // console.log(customerPoints)
    const transactions = customerPoints.transactions
    rows.push(
      <tr key={`${customerId}-header`}>
        <td rowSpan={transactions?.length}>{customerId}</td>
        <td>{transactions[0].month}</td>
        <td>{transactions[0].amount}</td>
        <td>{transactions[0].points}</td>
        <td rowSpan={transactions.length}>{customerPoints.total}</td>
      </tr>,
    )

    for (let i = 1; i < transactions.length; i++) {
      rows.push(
        <tr key={`${customerId}-${transactions[i].month}`}>
          <td>{transactions[i].month}</td>
          <td>{transactions[i].amount}</td>
          <td>{transactions[i].points}</td>
        </tr>,
      )
    }
  }

  return rows
}
