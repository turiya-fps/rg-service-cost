import { EMPTY_BUILDING_DATA_MAPPING, EMPTY_SCENARIO_DATA_MAPPING } from './building';

describe('EMPTY_SCENARIO_DATA_MAPPING', (): void => {
  it('has all properties', (): void => {
    expect(
      Object.keys(EMPTY_SCENARIO_DATA_MAPPING).length,
    ).toStrictEqual(4);
  });
});

describe('EMPTY_BUILDING_DATA_MAPPING', (): void => {
  it('has all properties', (): void => {
    expect(
      Object.keys(EMPTY_BUILDING_DATA_MAPPING).length,
    ).toStrictEqual(55);
  });
});
