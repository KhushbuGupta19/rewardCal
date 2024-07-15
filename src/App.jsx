import './App.css'

import React, { useCallback, useEffect, useState } from 'react';

import {calculateRewards} from './utility/RewardCal'
import {fetchCustomerTransactions} from './utility/api'
import {renderRewardsData} from './utility/RewardCal'

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [rewardPoints, setRewardPoints] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchCustomerTransactions();
      // console.log(result)
      setTransactions(result);
      setRewardPoints(calculateRewards(result));
    };
    fetchData();
  }, []);

  return (
    <div className='rewards__container'>
         
      <h1>Rewards Program</h1>
      <h3>Rewards Offered To Customer</h3>
      <table border="1" className='rewards__container__table'>
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>Month</th>
            <th>Amount</th>
            <th>Points</th>
            <th>Total Points</th>
          </tr>
        </thead>
        <tbody>
          {renderRewardsData(rewardPoints)}
        </tbody>
      </table>
  
    </div>
  );
};

export default App;
