import { CostElementReferenceGroupIndex, CostElementReferenceGroupItemIndex } from '@project-rouge/service-cost-client/src/data/cost-element-reference';
import type { ValueGroup } from '@project-rouge/service-cost-client/src/data/value-breakdown';
import { createEmbodiedCarbonCostElementReference } from './embodied-carbon-element-reference';

describe('createEmbodiedCarbonCostElementReference()', (): void => {
  it('with nancy, create summaries value groups', (): void => {
    expect(
      createEmbodiedCarbonCostElementReference({
        modular: {
          summary: [
            {
              index: '1',
              total: 908190.41,
              items: [
                { index: '1.1', value: 908190.41 },
              ],
            },
          ],
          element: [
            {
              index: '2',
              total: 40921.53,
              items: [
                { index: '2.6', value: 26361.84 },
                { index: '2.8', value: 14559.69 },
              ],
            },
            {
              index: '3',
              total: 47642.34,
              items: [
                { index: '3.1', value: 4577.47 },
                { index: '3.2', value: 39236.24 },
                { index: '3.3', value: 3828.63 },
              ],
            },
            {
              index: '4',
              total: 4214.08,
              items: [
                { index: '4.1', value: 4214.08 },
              ],
            },
            {
              index: '5',
              total: 153736.07,
              items: [
                { index: '5.1', value: 2496.36 },
                { index: '5.3', value: 799.44 },
                { index: '5.4', value: 3138.56 },
                { index: '5.6', value: 66129.39 },
                { index: '5.7', value: 34754.41 },
                { index: '5.8', value: 27844.61 },
                { index: '5.14', value: 18573.3 },
              ],
            },
            {
              index: '6',
              total: 661676.39,
              items: [
                { index: '6.2', value: 661676.39 },
              ],
            },
          ],
        },
        basebuild: {
          summary: [
            {
              index: '1',
              total: 1126909.85,
              items: [
                { index: '1.3', value: 1126909.85 },
              ],
            },
          ],
          element: [
            {
              index: '2',
              total: 1078578.41,
              items: [
                { index: '2.1', value: 111530.36 },
                { index: '2.2', value: 358770.87 },
                { index: '2.3', value: 215576.47 },
                { index: '2.4', value: 6095 },
                { index: '2.5', value: 378087.63 },
                { index: '2.7', value: 1978.47 },
                { index: '2.8', value: 6539.61 },
              ],
            },
            {
              index: '3',
              total: 16240.74,
              items: [
                { index: '3.1', value: 137.11 },
                { index: '3.2', value: 15966.52 },
                { index: '3.3', value: 137.11 },
              ],
            },
            {
              index: '5',
              total: 32090.7,
              items: [
                { index: '5.10', value: 32090.7 },
              ],
            },
          ],
        },
      }),
    ).toStrictEqual<ValueGroup<number>[]>([
      {
        index: CostElementReferenceGroupIndex.Superstructure,
        total: 1_781_176.33,
        items: [
          {
            index: CostElementReferenceGroupItemIndex.SuperstructureFrame,
            value: 773_206.75,
          },
          {
            index: CostElementReferenceGroupItemIndex.SuperstructureUpperFloors,
            value: 358_770.87,
          },
          {
            index: CostElementReferenceGroupItemIndex.SuperstructureRoof,
            value: 215_576.47,
          },
          {
            index: CostElementReferenceGroupItemIndex.SuperstructureStairsAndRamps,
            value: 6_095.00,
          },
          {
            index: CostElementReferenceGroupItemIndex.SuperstructureExternalWalls,
            value: 378_087.63,
          },
          {
            index: CostElementReferenceGroupItemIndex.SuperstructureWindowsAndExternalDoors,
            value: 26_361.84,
          },
          {
            index: CostElementReferenceGroupItemIndex.SuperstructureInternalWallsAndPartitions,
            value: 1_978.47,
          },
          {
            index: CostElementReferenceGroupItemIndex.SuperstructureInternalDoors,
            value: 21_099.30,
          },
        ],
      },
      {
        index: CostElementReferenceGroupIndex.InternalFinishes,
        total: 63_883.08,
        items: [
          {
            index: CostElementReferenceGroupItemIndex.InternalFinishesWallFinishes,
            value: 4_714.58,
          },
          {
            index: CostElementReferenceGroupItemIndex.InternalFinishesFloorFinishes,
            value: 55_202.76,
          },
          {
            index: CostElementReferenceGroupItemIndex.InternalFinishesCeilingFinishes,
            value: 3_965.74,
          },
        ],
      },
      {
        index: CostElementReferenceGroupIndex.FittingsFurnitureAndEquipment,
        total: 4_214.08,
        items: [
          {
            index: CostElementReferenceGroupItemIndex.FittingsFurnitureAndEquipment,
            value: 4_214.08,
          },
        ],
      },
      {
        index: CostElementReferenceGroupIndex.Services,
        total: 167_253.47,
        items: [
          {
            index: CostElementReferenceGroupItemIndex.ServicesSanitaryAppliances,
            value: 2_496.36,
          },
          {
            index: CostElementReferenceGroupItemIndex.ServicesDisposalInstallations,
            value: 799.44,
          },
          {
            index: CostElementReferenceGroupItemIndex.ServicesWaterInstallations,
            value: 3_138.56,
          },
          {
            index: CostElementReferenceGroupItemIndex.ServicesSpaceHeatingAndAirConditioning,
            value: 66_129.39,
          },
          {
            index: CostElementReferenceGroupItemIndex.ServicesVentilation,
            value: 34_754.41,
          },
          {
            index: CostElementReferenceGroupItemIndex.ServicesElectricalInstallations,
            value: 27_844.61,
          },
          {
            index: CostElementReferenceGroupItemIndex.ServicesLiftsAndConveyorInstallations,
            value: 32_090.70,
          },
        ],
      },
    ]);
  });
});
