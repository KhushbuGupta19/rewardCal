#Project is created using Vite 
#library used - react and jest (for testing)


#To install the all packages run below command 
npm Install


#to run the test cases run below command
npm run test


#to run the project run below command
npm run dev

#to Create Build
npm run build

#have created one mock api using javascript promises.calling a function named fetchCustomerTransactions to perform the get operation. api is api.js file



#created one file named RewardsCal.jsx to calculate the rewards points using calculateRewards  which is taking transaction of customer as input and generating the rewards points on basis of that input.there is one function renderRewardsData inside this file which is used to render the data in tabular form,it is taking the rewards points as input as displaying data in more user-friendly way.


#Documentation for all the screens of Application like for error message while fetching data from api .ErrorBoundary fallback Ui in case of app will get crash ,documentation for Test cases and flowchart .please check below link:

#Documentation Link:
#https://docs.google.com/document/d/1y97qVeuflk8hAIJ1CCxhOKPU3HgXJ5A_JoUcqBTdaiE/edit?usp=sharing

Reward Calculation 
Assigned Task:A retailer offers a rewards program to its customers, awarding points based on each recorded purchase.  
  
A customer receives 2 points for every dollar spent over $100 in each transaction, plus 1 point for every dollar spent between $50 and $100 in each transaction. 
(e.g. a $120 purchase = 2x$20 + 1x$50 = 90 points). 
  
Given a record of every transaction during a three month period, calculate the reward points earned for each customer per month and total. 



Proposed Solution:


I have implemented the solution for above task using react js . took 4 Customers their id is respectively 1,2,4 and 5.here i am fetching all the transaction done by these customers in month 4,5 and 6 .first i calculated the Rewards points of each customer for every transaction he/she made monthly basis then i calculated the total Rewards earned by the Customer.


Successfully fetching the transactions and calculating the rewards
CustomerId- for Customer Id
Months- Months of transaction done by customer
Amount -Amount of transaction
Points-reward points on basis of amount
Total Points - Total reward points of each customer

The Data Table of calculated Rewards Points of Each customer .the data is shorted according to the Customer id then year wise than month wise.

![image](https://github.com/user-attachments/assets/791d0e32-b7ae-4728-a221-c54207590447)

Ex Customer:1
month:4
Transaction amount:120
Reward points:90(40(above 100- 2 points for each dollar spend by customer)+50(above 50-1 points for each dollar spend by customer))
Month:5
Amount
75
Reward points:25


Ex.2:  Customer:5
Month:6
Amount
200
Reward points:250

Error Condition : Error in Fetching data from api user will see an error msg like this 
![image](https://github.com/user-attachments/assets/f9a8e2ba-e4c9-4cc9-96c9-87ec36c69872)

ErrorBoundary : If Application Crashed due to any reason user will see this screen (added error boundary)
![image](https://github.com/user-attachments/assets/0fcddb7c-c69f-4bec-b64a-d238dd3aa046)




Test Cases:


Test Case 1: Calculate Points Correctly
This test case checks if the points are calculated correctly for the provided transactions.
It verifies the points for each month and the total points for each year.

Test Case 2: Return Zero Points for Transactions Below Amount 50
This test case checks if transactions below the amount of 50 return zero points.
It verifies the points for each month and the total points for each year.

Test Case 3: Handle Transactions of Different Years Correctly
This test case checks if transactions from different years are handled correctly.
It verifies the points for each month and the total points for each year.


![image](https://github.com/user-attachments/assets/392c8630-1244-4314-ad31-6bffeb7a5015)





