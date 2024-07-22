// Function to calculate rewards
export const calculateRewards = (transactions) => {
  const rewardPointsPerCustomer = {}; // per customer rewards
  // Sort transactions by customerId
  const sortedArray = transactions.sort((a, b) => a.customerId - b.customerId);
  //looping the sorted Array by CustomerId
  sortedArray?.forEach((transaction) => {
    const { customerId, amount, date } = transaction;
    const transactionDate = new Date(date);
    const month = transactionDate.getMonth() + 1; // month of transaction
    const year = transactionDate.getFullYear(); // year of transaction

    // Check if the customer exists in the table, if not, create a new record
    if (!rewardPointsPerCustomer[customerId]) {
      rewardPointsPerCustomer[customerId] = { transactions: [] };
    }

    // Check if the year entry exists for the customer, if not, create a new record
    if (!rewardPointsPerCustomer[customerId][year]) {
      rewardPointsPerCustomer[customerId][year] = { total: 0, months: {} };
    }

    // Check if the month entry exists for the customer, if not, create a new record
    if (!rewardPointsPerCustomer[customerId][year].months[month]) {
      rewardPointsPerCustomer[customerId][year].months[month] = {
        amount: 0,
        points: 0,
      };
    }

    // Accumulate the amount for the month for Each Customer
    rewardPointsPerCustomer[customerId][year].months[month].amount += amount;
    rewardPointsPerCustomer[customerId].transactions.push({
      year,
      month,
      amount,
      customerId,
    });
  });

  // Calculate points after accumulating amounts
  Object.keys(rewardPointsPerCustomer).forEach((customerId) => {
    const customerData = rewardPointsPerCustomer[customerId];
    Object.keys(customerData).forEach((year) => {
      if (year !== "transactions") {
        const yearData = customerData[year];
        Object.keys(yearData.months).forEach((month) => {
          const monthData = yearData.months[month];
          let points = 0;
          const totalAmount = monthData.amount;

          if (totalAmount > 100) {
            points += (totalAmount - 100) * 2 + 50;
          } else if (totalAmount >= 50) {
            points += totalAmount - 50;
          }

          monthData.points = points;
          yearData.total += points;
        });
      }
    });
  });

  return rewardPointsPerCustomer;
};

// Rendering the data in tabular form
export const renderRewardsData = (points) => {
  return Object.keys(points).map((customerId) => {
    const customerPoints = points[customerId];
    const years = Object.keys(customerPoints).filter(
      (key) => key !== "transactions"
    );

    return years.map((year) => {
      const yearData = customerPoints[year];
      const months = Object.keys(yearData.months);

      return months.map((month, index) => {
        const monthData = yearData.months[month];

        return (
          <tr key={`${customerId}-${year}-${month}`}>
            {index === 0 && <td rowSpan={months.length}>{customerId}</td>}
            <td>{year}</td>
            <td>{month}</td>
            <td>{monthData.amount}</td>
            <td>{monthData.points}</td>
            {index === 0 && <td rowSpan={months.length}>{yearData.total}</td>}
          </tr>
        );
      });
    });
  });
};
