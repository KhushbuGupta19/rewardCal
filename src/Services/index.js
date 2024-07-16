import { fetchCustomerTransactions } from './api'

//fetching data from api
export const fetchData = async () => {
  try {
    const result = await fetchCustomerTransactions()
    return result
  } catch (error) {}
}
