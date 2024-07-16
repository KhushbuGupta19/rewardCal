import { calculateRewards } from './Components/RewardCal';
import { logger } from './Looger/Logger';

describe('calculatePoints', () => {
  it('should calculate points correctly for the provided transactions', () => {
    const transactions = [
      { customerId: 1, amount: 120, date: '2024-04-01' },
      { customerId: 1, amount: 75, date: '2024-05-15' },
      { customerId: 2, amount: 200, date: '2024-04-20' },
      { customerId: 1, amount: 50, date: '2024-05-01' },
      { customerId: 2, amount: 120, date: '2024-05-10' },
      { customerId: 2, amount: 150, date: '2024-06-01' },
      { customerId: 4, amount: 200, date: '2024-06-01' },
      { customerId: 4, amount: 75, date: '2024-06-01' },
      { customerId: 5, amount: 200, date: '2024-06-01' },
    ];

    logger('Transactions:', transactions);

    const expectedPoints = {
      1: { 4: 90, 5: 25, total: 115 },
      2: { 4: 250, 5: 90, 6: 150, total: 490 },
      4: { 6: 275, total: 275 },
      5: { 6: 250, total: 250 },
    };

    const calculatedPoints = calculateRewards(transactions);

    logger('Calculated Points:', calculatedPoints);
    // Check points for each customer
    Object.keys(expectedPoints).map(customerId => {
      Object.keys(expectedPoints[customerId]).map(month => {
        if (month !== 'total') {
          expect(calculatedPoints[customerId][month]).toBe(
            expectedPoints[customerId][month],
          );
        }
      });
      // Check total points for each customer
      expect(calculatedPoints[customerId].total).toBe(
        expectedPoints[customerId].total,
      );
    });
  });

  it('should return zero points for transactions below Amount 50 ', () => {
    const transactions = [
      { customerId: 1, amount: 30, date: '2024-04-01' },
      { customerId: 2, amount: 40, date: '2024-05-15' },
    ];

    logger('Transactions:', transactions);

    const expectedPoints = {
      1: { 4: 0, total: 0 },
      2: { 5: 0, total: 0 },
    };

    const calculatedPoints = calculateRewards(transactions);

    logger('Calculated Points:', calculatedPoints);

    Object.keys(expectedPoints).map(customerId => {
      Object.keys(expectedPoints[customerId]).map(month => {
        if (month !== 'total') {
          expect(calculatedPoints[customerId][month]).toBe(
            expectedPoints[customerId][month],
          );
        }
      });
      expect(calculatedPoints[customerId].total).toBe(
        expectedPoints[customerId].total,
      );
    });
  });

  it('should handle transactions of different years correctly', () => {
    const transactions = [
      { customerId: 1, amount: 120, date: '2023-12-31' },
      { customerId: 1, amount: 75, date: '2024-01-01' },
    ];

    logger('Transactions:', transactions);

    const expectedPoints = {
      1: { 12: 90, 1: 25, total: 115 },
    };

    const calculatedPoints = calculateRewards(transactions);

    logger('Calculated Points:', calculatedPoints);

    Object.keys(expectedPoints).map(customerId => {
      Object.keys(expectedPoints[customerId]).map(month => {
        if (month !== 'total') {
          expect(calculatedPoints[customerId][month]).toBe(
            expectedPoints[customerId][month],
          );
        }
      });
      expect(calculatedPoints[customerId].total).toBe(
        expectedPoints[customerId].total,
      );
    });
  });


});
