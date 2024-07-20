import './App.css'

import React, { useEffect, useState } from 'react'

import { calculateRewards } from './Components/RewardCal'
import { fetchData } from './Services'
import { renderRewardsData } from './Components/RewardCal'

const App = () => {
  //Reward Points for customer
  const [rewardPoints, setRewardPoints] = useState({})
  const[Loading,setLoading]=useState(false)
  useEffect(() => {
    setLoading(true)
   const timer=setTimeout(()=>{
      //calling fetchData function to fetch the transaction records
      fetchData()
      .then((res) => {
        setRewardPoints(calculateRewards(res))
        setLoading(false)
      })
      .catch(() => {})
   },500)
   return()=>{
    clearTimeout(timer)
   }
  }, [])
  return (
    <div className="rewards__container">
      {Loading?<div className='Loader'>Loading....</div>
      :
      Object.keys(rewardPoints).length != 0 ? (
        <>
          <h1>Rewards Program</h1>
          <h3>Rewards Offered To Customer</h3>
          <table border="1" className="rewards__container__table">
            <thead>
              <tr>
                <th>Customer ID</th>
                <th>Year</th>
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
      )
    }
    </div>
  )
}

export default App
