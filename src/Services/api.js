//Customer Transaction Mock Api
export const fetchCustomerTransactions = () => {
  try{
    return new Promise((resolve,reject) => {
      //  throw new Error("Error fetching transaction");
        resolve([
          { customerId: 1, amount: 120, date: '2024-04-01' },
          { customerId: 1, amount: 75, date: '2024-05-15' },
          { customerId: 2, amount: 200, date: '2024-04-20' },
          { customerId: 1, amount: 50, date: '2024-05-01' },
          { customerId: 2, amount: 120, date: '2024-05-10' },
          { customerId: 2, amount: 150, date: '2024-06-01' },
          { customerId: 4, amount: 200, date: '2024-06-01' },
          { customerId: 4, amount: 75, date: '2024-06-01' },
          { customerId: 5, amount: 200, date: '2024-06-01' },
        ]);
       
    });
  }catch(error){
  }
  };
  