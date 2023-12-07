import type { ValueGroup } from '@project-rouge/service-cost-client/src/data/value-breakdown';
import { QueryView } from '../query/view';
import { createValueGroupFromQueryRecords } from './value-group';

describe('createValueGroupFromQueryRecords()', (): void => {
  it('with raw results, converts to structured response', (): void => {
    expect(
      createValueGroupFromQueryRecords([
        { view: QueryView.ModularSummary, index: '1.1', cost: '2498555.72', carbon: '2972200.35' },
        { view: QueryView.ModularSummary, index: '1.2', cost: '1690002.98', carbon: '0' },
        { view: QueryView.ModularSummary, index: '2.1', cost: '418855.87', carbon: '96417.24' },
        { view: QueryView.ModularSummary, index: '3.1', cost: '230370.73', carbon: '14629.90' },
        { view: QueryView.ModularSummary, index: '4.1', cost: '67278.20', carbon: '13564.07' },
        { view: QueryView.ModularSummary, index: '4.2', cost: '66283.94', carbon: '7821.53' },
      ], 'cost'),
    ).toStrictEqual<ValueGroup<number>[]>([
      {
        index: '1',
        total: 4_188_558.7,
        items: [
          {
            index: '1.1',
            value: 2_498_555.72,
          },
          {
            index: '1.2',
            value: 1_690_002.98,
          },
        ],
      },
      {
        index: '2',
        total: 418_855.87,
        items: [
          {
            index: '2.1',
            value: 418_855.87,
          },
        ],
      },
      {
        index: '3',
        total: 230_370.73,
        items: [
          {
            index: '3.1',
            value: 230_370.73,
          },
        ],
      },
      {
        index: '4',
        total: 133_562.14,
        items: [
          {
            index: '4.1',
            value: 67_278.20,
          },
          {
            index: '4.2',
            value: 66_283.94,
          },
        ],
      },
    ]);
  });
});
