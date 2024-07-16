import './App.css'

import React, { useCallback, useEffect, useState } from 'react'

import { calculateRewards } from './Components/RewardCal'
import { fetchData } from './Services'
import { renderRewardsData } from './Components/RewardCal'

const App = () => {
  //Reward Points for customer
  const [rewardPoints, setRewardPoints] = useState({})
  useEffect(() => {
     //calling fetchData function to fetch the transaction records
    fetchData()
      .then((res) => {
        setRewardPoints(calculateRewards(res))
      })
      .catch(() => {})
  }, [])
  return (
    <div className="rewards__container">
      {Object.keys(rewardPoints).length != 0 ? (
        <>
          <h1>Rewards Program</h1>
          <h3>Rewards Offered To Customer</h3>
          <table border="1" className="rewards__container__table">
            <thead>
              <tr>
                <th>Customer ID</th>
                <th>Month</th>
                <th>Amount</th>
                <th>Points</th>
                <th>Total Points</th>
              </tr>
            </thead>
            <tbody>{renderRewardsData(rewardPoints)}</tbody>
          </table>
        </>
      ) : (
        <div className="error">Failed to fetch customer transactions</div>
      )}
    </div>
  )
}

export default App
