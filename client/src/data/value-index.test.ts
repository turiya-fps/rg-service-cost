import type { CostElementReferenceGroupIndex } from './cost-element-reference';
import { CostElementReferenceGroupItemIndex } from './cost-element-reference';
import { CostSummaryGroupIndex, CostSummaryGroupItemIndex } from './cost-summary';
import type { ValueGroup } from './value-breakdown';
import type { ValueGroupItemIndex } from './value-index';
import { parseValueGroupItemIndex, sortValueGroupIndexFunction } from './value-index';

describe('parseCostGroupItemIndex()', (): void => {
  type TestCase = {
    readonly label: string;
    readonly input: CostSummaryGroupItemIndex | CostElementReferenceGroupItemIndex;
    readonly group: string;
    readonly item: string;
  };

  it.each<TestCase>([
    // CostSummaryGroupItemIndex
    { label: 'CostSummaryGroupItemIndex.ConstructionModules', input: CostSummaryGroupItemIndex.ConstructionModules, group: '1', item: '1' },
    { label: 'CostSummaryGroupItemIndex.ConstructionFitOut', input: CostSummaryGroupItemIndex.ConstructionFitOut, group: '1', item: '2' },
    { label: 'CostSummaryGroupItemIndex.ConstructionBaseBuild', input: CostSummaryGroupItemIndex.ConstructionBaseBuild, group: '1', item: '3' },

    { label: 'CostSummaryGroupItemIndex.Preliminaries', input: CostSummaryGroupItemIndex.Preliminaries, group: '2', item: '1' },
    { label: 'CostSummaryGroupItemIndex.ContingencyConstruction', input: CostSummaryGroupItemIndex.Contingency, group: '3', item: '1' },
    { label: 'CostSummaryGroupItemIndex.OverheadsAndProfit', input: CostSummaryGroupItemIndex.OverheadsAndProfit, group: '4', item: '1' },

    // CostElementReferenceGroupItemIndex
    { label: 'CostElementReferenceGroupItemIndex.DemolitionAndAlterationsSiteClearance', input: CostElementReferenceGroupItemIndex.FacilitatingWorksSiteClearance, group: '0', item: '2' },

    { label: 'CostElementReferenceGroupItemIndex.Substructure', input: CostElementReferenceGroupItemIndex.Substructure, group: '1', item: '1' },

    { label: 'CostElementReferenceGroupItemIndex.StructureFrame', input: CostElementReferenceGroupItemIndex.SuperstructureFrame, group: '2', item: '1' },
    { label: 'CostElementReferenceGroupItemIndex.StructureUpperFloors', input: CostElementReferenceGroupItemIndex.SuperstructureUpperFloors, group: '2', item: '2' },
    { label: 'CostElementReferenceGroupItemIndex.StructureRoofs', input: CostElementReferenceGroupItemIndex.SuperstructureRoof, group: '2', item: '3' },
    { label: 'CostElementReferenceGroupItemIndex.StructureStairs', input: CostElementReferenceGroupItemIndex.SuperstructureStairsAndRamps, group: '2', item: '4' },
    { label: 'CostElementReferenceGroupItemIndex.StructureExternalWalls', input: CostElementReferenceGroupItemIndex.SuperstructureExternalWalls, group: '2', item: '5' },
    { label: 'CostElementReferenceGroupItemIndex.StructureInternalWallsAndPartitions', input: CostElementReferenceGroupItemIndex.SuperstructureInternalWallsAndPartitions, group: '2', item: '7' },
    { label: 'CostElementReferenceGroupItemIndex.StructureInternalDoors', input: CostElementReferenceGroupItemIndex.SuperstructureInternalDoors, group: '2', item: '8' },

    { label: 'CostElementReferenceGroupItemIndex.InternalFinishesWallFinishes', input: CostElementReferenceGroupItemIndex.InternalFinishesWallFinishes, group: '3', item: '1' },
    { label: 'CostElementReferenceGroupItemIndex.InternalFinishesFloorFinishes', input: CostElementReferenceGroupItemIndex.InternalFinishesFloorFinishes, group: '3', item: '2' },
    { label: 'CostElementReferenceGroupItemIndex.InternalFinishesCeilingFinishes', input: CostElementReferenceGroupItemIndex.InternalFinishesCeilingFinishes, group: '3', item: '3' },

    { label: 'CostElementReferenceGroupItemIndex.FittingsAndFurniture', input: CostElementReferenceGroupItemIndex.FittingsFurnitureAndEquipment, group: '4', item: '1' },

    { label: 'CostElementReferenceGroupItemIndex.ServicesSanitaryAppliances', input: CostElementReferenceGroupItemIndex.ServicesSanitaryAppliances, group: '5', item: '1' },
    { label: 'CostElementReferenceGroupItemIndex.ServicesDisposalInstallations', input: CostElementReferenceGroupItemIndex.ServicesDisposalInstallations, group: '5', item: '3' },
    { label: 'CostElementReferenceGroupItemIndex.ServicesWaterInstallations', input: CostElementReferenceGroupItemIndex.ServicesWaterInstallations, group: '5', item: '4' },
    { label: 'CostElementReferenceGroupItemIndex.ServicesHeatSource', input: CostElementReferenceGroupItemIndex.ServicesHeatSource, group: '5', item: '5' },
    { label: 'CostElementReferenceGroupItemIndex.ServicesSpaceHeadingAndAirConditioning', input: CostElementReferenceGroupItemIndex.ServicesSpaceHeatingAndAirConditioning, group: '5', item: '6' },
    { label: 'CostElementReferenceGroupItemIndex.ServicesVentilationSystems', input: CostElementReferenceGroupItemIndex.ServicesVentilation, group: '5', item: '7' },
    { label: 'CostElementReferenceGroupItemIndex.ServicesElectricalInstallations', input: CostElementReferenceGroupItemIndex.ServicesElectricalInstallations, group: '5', item: '8' },
    { label: 'CostElementReferenceGroupItemIndex.ServicesFuelInstallations', input: CostElementReferenceGroupItemIndex.ServicesFuelInstallations, group: '5', item: '9' },
    { label: 'CostElementReferenceGroupItemIndex.ServicesLiftsAndEscalators', input: CostElementReferenceGroupItemIndex.ServicesLiftsAndConveyorInstallations, group: '5', item: '10' },
    { label: 'CostElementReferenceGroupItemIndex.ServicesProtectiveInstallations', input: CostElementReferenceGroupItemIndex.ServicesFireAndLightningProtection, group: '5', item: '11' },
    { label: 'CostElementReferenceGroupItemIndex.ServicesFireAlarmsCommunicationsAndSecurity', input: CostElementReferenceGroupItemIndex.ServicesCommunicationSecurityAndControlSystems, group: '5', item: '12' },
    { label: 'CostElementReferenceGroupItemIndex.ServicesSpecialistInstallations', input: CostElementReferenceGroupItemIndex.ServicesSpecialistInstallations, group: '5', item: '13' },
    { label: 'CostElementReferenceGroupItemIndex.ServicesBuildersWorkInConnection', input: CostElementReferenceGroupItemIndex.ServicesBuildersWorkInConnectionWithServices, group: '5', item: '14' },

    { label: 'CostElementReferenceGroupItemIndex.PreFabricatedComponentsOffSitePanelManufactureAndAssembly', input: CostElementReferenceGroupItemIndex.PrefabricatedBuildingAndBuildingUnitsOffSitePanelManufactureAndAssembly, group: '6', item: '2' },
    { label: 'CostElementReferenceGroupItemIndex.PreFabricatedComponentsOnSiteDeploymentOfModules', input: CostElementReferenceGroupItemIndex.PrefabricatedBuildingAndBuildingUnitsOnSiteDeploymentOfModules, group: '6', item: '3' },

    { label: 'CostElementReferenceGroupItemIndex.ExternalWorksSiteWorks', input: CostElementReferenceGroupItemIndex.ExternalWorksSiteWorks, group: '8', item: '1' },
    { label: 'CostElementReferenceGroupItemIndex.ExternalWorksExternalServices', input: CostElementReferenceGroupItemIndex.ExternalWorksExternalServices, group: '8', item: '7' },
  ])('with index, $index, parses as expected', (data): void => {
    expect(
      parseValueGroupItemIndex(data.input),
    ).toStrictEqual<ValueGroupItemIndex>({
      group: data.group as CostSummaryGroupIndex | CostElementReferenceGroupIndex,
      item: data.item as CostSummaryGroupItemIndex | CostElementReferenceGroupItemIndex,
    });
  });
});

describe('sortCostGroupIndexFunction()', (): void => {
  it('with summary groups', (): void => {
    const groups: ValueGroup<number>[] = [
      { index: CostSummaryGroupIndex.OverheadsAndProfit, total: 0, items: [] },
      { index: CostSummaryGroupIndex.Contingency, total: 0, items: [] },
      { index: CostSummaryGroupIndex.Construction, total: 0, items: [] },
      { index: CostSummaryGroupIndex.Preliminaries, total: 0, items: [] },
    ];

    expect(
      groups.sort(sortValueGroupIndexFunction),
    ).toStrictEqual<ValueGroup<number>[]>([
      { index: CostSummaryGroupIndex.Construction, total: 0, items: [] },
      { index: CostSummaryGroupIndex.Preliminaries, total: 0, items: [] },
      { index: CostSummaryGroupIndex.Contingency, total: 0, items: [] },
      { index: CostSummaryGroupIndex.OverheadsAndProfit, total: 0, items: [] },
    ]);
  });

  it('with summary group items', (): void => {
    const groups: ValueGroup<number>[] = [
      { index: CostElementReferenceGroupItemIndex.ServicesDisposalInstallations, total: 0, items: [] },
      { index: CostElementReferenceGroupItemIndex.ServicesSpaceHeatingAndAirConditioning, total: 0, items: [] },
      { index: CostElementReferenceGroupItemIndex.ServicesSpecialistInstallations, total: 0, items: [] },
      { index: CostElementReferenceGroupItemIndex.ServicesSanitaryAppliances, total: 0, items: [] },
      { index: CostElementReferenceGroupItemIndex.ServicesWaterInstallations, total: 0, items: [] },
      { index: CostElementReferenceGroupItemIndex.ServicesElectricalInstallations, total: 0, items: [] },
      { index: CostElementReferenceGroupItemIndex.ServicesFireAndLightningProtection, total: 0, items: [] },
      { index: CostElementReferenceGroupItemIndex.ServicesCommunicationSecurityAndControlSystems, total: 0, items: [] },
      { index: CostElementReferenceGroupItemIndex.ServicesBuildersWorkInConnectionWithServices, total: 0, items: [] },
      { index: CostElementReferenceGroupItemIndex.ServicesLiftsAndConveyorInstallations, total: 0, items: [] },
      { index: CostElementReferenceGroupItemIndex.ServicesFuelInstallations, total: 0, items: [] },
      { index: CostElementReferenceGroupItemIndex.ServicesVentilation, total: 0, items: [] },
      { index: CostElementReferenceGroupItemIndex.ServicesHeatSource, total: 0, items: [] },
    ];

    expect(
      groups.sort(sortValueGroupIndexFunction),
    ).toStrictEqual<ValueGroup<number>[]>([
      { index: CostElementReferenceGroupItemIndex.ServicesSanitaryAppliances, total: 0, items: [] },
      { index: CostElementReferenceGroupItemIndex.ServicesDisposalInstallations, total: 0, items: [] },
      { index: CostElementReferenceGroupItemIndex.ServicesWaterInstallations, total: 0, items: [] },
      { index: CostElementReferenceGroupItemIndex.ServicesHeatSource, total: 0, items: [] },
      { index: CostElementReferenceGroupItemIndex.ServicesSpaceHeatingAndAirConditioning, total: 0, items: [] },
      { index: CostElementReferenceGroupItemIndex.ServicesVentilation, total: 0, items: [] },
      { index: CostElementReferenceGroupItemIndex.ServicesElectricalInstallations, total: 0, items: [] },
      { index: CostElementReferenceGroupItemIndex.ServicesFuelInstallations, total: 0, items: [] },
      { index: CostElementReferenceGroupItemIndex.ServicesLiftsAndConveyorInstallations, total: 0, items: [] },
      { index: CostElementReferenceGroupItemIndex.ServicesFireAndLightningProtection, total: 0, items: [] },
      { index: CostElementReferenceGroupItemIndex.ServicesCommunicationSecurityAndControlSystems, total: 0, items: [] },
      { index: CostElementReferenceGroupItemIndex.ServicesSpecialistInstallations, total: 0, items: [] },
      { index: CostElementReferenceGroupItemIndex.ServicesBuildersWorkInConnectionWithServices, total: 0, items: [] },
    ]);
  });
});
