import { COST_ELEMENT_REFERENCE_GROUP_INDEXES, COST_ELEMENT_REFERENCE_GROUP_ITEM_INDEXES, CostElementReferenceGroupIndex, CostElementReferenceGroupItemIndex } from './cost-element-reference';

describe('COST_ELEMENT_REFERENCE_GROUP_INDEXES', (): void => {
  it('with array, expects length', (): void => {
    expect(COST_ELEMENT_REFERENCE_GROUP_INDEXES.length).toStrictEqual(8);
  });

  it('with array, index 0, demolition and alterations', (): void => {
    expect(
      COST_ELEMENT_REFERENCE_GROUP_INDEXES[0],
    ).toStrictEqual(CostElementReferenceGroupIndex.FacilitatingWorks);
  });

  it('with array, index 4, fittings and furniture', (): void => {
    expect(
      COST_ELEMENT_REFERENCE_GROUP_INDEXES[4],
    ).toStrictEqual(CostElementReferenceGroupIndex.FittingsFurnitureAndEquipment);
  });

  it('with array, index 8, external works', (): void => {
    expect(
      COST_ELEMENT_REFERENCE_GROUP_INDEXES[7],
    ).toStrictEqual(CostElementReferenceGroupIndex.ExternalWorks);
  });
});

describe('COST_ELEMENT_REFERENCE_GROUP_ITEM_INDEXES', (): void => {
  it('with array, expects length', (): void => {
    expect(COST_ELEMENT_REFERENCE_GROUP_ITEM_INDEXES.length).toStrictEqual(38);
  });

  it('with array, index 0, demolition and alterations, site clearance', (): void => {
    expect(
      COST_ELEMENT_REFERENCE_GROUP_ITEM_INDEXES[0],
    ).toStrictEqual(CostElementReferenceGroupItemIndex.FacilitatingWorksSiteClearance);
  });

  it('with array, index 10, internal finishes, wall finishes', (): void => {
    expect(
      COST_ELEMENT_REFERENCE_GROUP_ITEM_INDEXES[10],
    ).toStrictEqual(CostElementReferenceGroupItemIndex.InternalFinishesWallFinishes);
  });

  it('with array, index 26, services, specialist installations', (): void => {
    expect(
      COST_ELEMENT_REFERENCE_GROUP_ITEM_INDEXES[26],
    ).toStrictEqual(CostElementReferenceGroupItemIndex.ServicesSpecialistInstallations);
  });

  it('with array, index 37, services, specialist installations', (): void => {
    expect(
      COST_ELEMENT_REFERENCE_GROUP_ITEM_INDEXES[37],
    ).toStrictEqual(CostElementReferenceGroupItemIndex.ExternalWorksExternalServices);
  });
});
