import { toSquareFoot } from '@project-rouge/service-core/data/area';
import { toPrecision } from '@project-rouge/service-core/data/number';

/**
 * An object that has "per metric values" of type {@link T}.
 */
export type ValuePerMetric<T> = {
  readonly unit: T;
  readonly sqm: T;
  readonly sqft: T;
};

/**
 * Calculate the "per area" cost of the given {@link total}.
 */
export const calculateTotalPerArea = (total: number, area: number): number => {
  return toPrecision(total / area, 2);
};

/**
 * Calculate the "per unit" cost of the given {@link total}.
 */
export const calculateTotalPerUnit = (total: number, units: number): number => {
  return toPrecision(total / units, 2);
};

/**
 * Calculate the {@link ValuePerMetric} from given inputs.
 */
export const calculateValuePerMetrics = (total: number, units: number, sqm: number): ValuePerMetric<number> => {
  return {
    unit: calculateTotalPerUnit(total, units),
    sqm: calculateTotalPerArea(total, sqm),
    sqft: calculateTotalPerArea(total, toSquareFoot(sqm)),
  };
};
