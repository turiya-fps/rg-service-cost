import type { ValuePerMetric } from './value-per-metric';
import { calculateTotalPerArea, calculateTotalPerUnit, calculateValuePerMetrics } from './value-per-metric';

describe('calculateTotalPerArea()', (): void => {
  type TestCase = {
    readonly total: number;
    readonly area: number;
    readonly expected: number;
  };

  it.each<TestCase>([
    { total: 1, area: 1, expected: 1 },
    { total: 10, area: 2, expected: 5 },

    { total: 4_188_558, area: 1_108.1, expected: 3779.95 },
    { total: 197_558, area: 716.53, expected: 275.71 },
    { total: 2_996_952, area: 2107.42, expected: 1422.1 },
  ])('with total $total, with area $area, calculates $expected', (data): void => {
    expect(
      calculateTotalPerArea(data.total, data.area),
    ).toStrictEqual(data.expected);
  });
});

describe('calculateTotalPerUnit()', (): void => {
  type TestCase = {
    readonly total: number;
    readonly units: number;
    readonly expected: number;
  };

  it.each<TestCase>([
    { total: 1, units: 1, expected: 1 },
    { total: 10, units: 2, expected: 5 },

    { total: 4_188_558, units: 32, expected: 130_892.44 },
    { total: 197_558, units: 34, expected: 5_810.53 },
    { total: 2_996_952, units: 41, expected: 73_096.39 },
  ])('with $total and $area, calculates $expected', (data): void => {
    expect(
      calculateTotalPerUnit(data.total, data.units),
    ).toStrictEqual(data.expected);
  });
});

describe('calculateValuePerMetrics()', (): void => {
  type TestCase = {
    readonly total: number;
    readonly units: number;
    readonly sqm: number;
    readonly expected: ValuePerMetric<number>;
  };

  it.each<TestCase>([
    { total: 2_856_283, units: 38, sqm: 2519.55, expected: { unit: 75_165.34, sqm: 1_133.65, sqft: 105.32 } },
    { total: 1_919_665, units: 38, sqm: 2519.55, expected: { unit: 50_517.50, sqm: 761.91, sqft: 70.78 } },
    { total: 4_775_948, units: 38, sqm: 2519.55, expected: { unit: 125_682.84, sqm: 1_895.56, sqft: 176.10 } },
    { total: 477_595, units: 38, sqm: 2519.55, expected: { unit: 12_568.29, sqm: 189.56, sqft: 17.61 } },
    { total: 262_677, units: 38, sqm: 2519.55, expected: { unit: 6_912.55, sqm: 104.26, sqft: 9.69 } },
    { total: 152_292, units: 38, sqm: 2519.55, expected: { unit: 4_007.68, sqm: 60.44, sqft: 5.62 } },
    { total: 5_668_512, units: 38, sqm: 2519.55, expected: { unit: 149_171.37, sqm: 2_249.81, sqft: 209.01 } },
  ])('with values, total $total, units $units, meters $meters, calculates per value costs', (data): void => {
    expect(
      calculateValuePerMetrics(data.total, data.units, data.sqm),
    ).toStrictEqual<ValuePerMetric<number>>(data.expected);
  });
});
