import { calculateRewards } from './Components/RewardCal';
import { logger } from './Logger/Logger';

describe('calculateRewards', () => {
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
      1: { 2024: { months: { 4: { amount: 120, points: 90 }, 5: { amount: 125, points:100 } }, total: 190 } },
      2: { 2024: { months: { 4: { amount: 200, points: 250 }, 5: { amount: 120, points: 90 }, 6: { amount: 150, points: 150 } }, total: 490 } },
      4: { 2024: { months: { 6: { amount: 275, points: 400 } }, total: 400 } },
      5: { 2024: { months: { 6: { amount: 200, points: 250 } }, total: 250 } },
    };

    const calculatedPoints = calculateRewards(transactions);

    logger('Calculated Points:', calculatedPoints);
    // Check points for each customer
    Object.keys(expectedPoints).forEach(customerId => {
      Object.keys(expectedPoints[customerId]).forEach(year => {
        Object.keys(expectedPoints[customerId][year].months).forEach(month => {
          expect(calculatedPoints[customerId][year].months[month].points).toBe(
            expectedPoints[customerId][year].months[month].points,
          );
          expect(calculatedPoints[customerId][year].months[month].amount).toBe(
            expectedPoints[customerId][year].months[month].amount,
          );
        });
        // Check total points for each year
        expect(calculatedPoints[customerId][year].total).toBe(
          expectedPoints[customerId][year].total,
        );
      });
    });
  });

  it('should return zero points for transactions below Amount 50', () => {
    const transactions = [
      { customerId: 1, amount: 30, date: '2024-04-01' },
      { customerId: 2, amount: 40, date: '2024-05-15' },
    ];

    logger('Transactions:', transactions);

    const expectedPoints = {
      1: { 2024: { months: { 4: { amount: 30, points: 0 } }, total: 0 } },
      2: { 2024: { months: { 5: { amount: 40, points: 0 } }, total: 0 } },
    };

    const calculatedPoints = calculateRewards(transactions);

    logger('Calculated Points:', calculatedPoints);

    Object.keys(expectedPoints).forEach(customerId => {
      Object.keys(expectedPoints[customerId]).forEach(year => {
        Object.keys(expectedPoints[customerId][year].months).forEach(month => {
          expect(calculatedPoints[customerId][year].months[month].points).toBe(
            expectedPoints[customerId][year].months[month].points,
          );
          expect(calculatedPoints[customerId][year].months[month].amount).toBe(
            expectedPoints[customerId][year].months[month].amount,
          );
        });
        expect(calculatedPoints[customerId][year].total).toBe(
          expectedPoints[customerId][year].total,
        );
      });
    });
  });

  it('should handle transactions of different years correctly', () => {
    const transactions = [
      { customerId: 1, amount: 120, date: '2023-12-31' },
      { customerId: 1, amount: 75, date: '2024-01-01' },
    ];

    logger('Transactions:', transactions);

    const expectedPoints = {
      1: { 2023: { months: { 12: { amount: 120, points: 90 } }, total: 90 }, 2024: { months: { 1: { amount: 75, points: 25 } }, total: 25 } },
    };

    const calculatedPoints = calculateRewards(transactions);

    logger('Calculated Points:', calculatedPoints);

    Object.keys(expectedPoints).forEach(customerId => {
      Object.keys(expectedPoints[customerId]).forEach(year => {
        Object.keys(expectedPoints[customerId][year].months).forEach(month => {
          expect(calculatedPoints[customerId][year].months[month].points).toBe(
            expectedPoints[customerId][year].months[month].points,
          );
          expect(calculatedPoints[customerId][year].months[month].amount).toBe(
            expectedPoints[customerId][year].months[month].amount,
          );
        });
        expect(calculatedPoints[customerId][year].total).toBe(
          expectedPoints[customerId][year].total,
        );
      });
    });
  });
});
