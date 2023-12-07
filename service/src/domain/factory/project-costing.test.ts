import { fn } from '@matt-usurp/grok/testing';
import type { IdentityFactory } from '@project-rouge/service-core/data/identity';
import type { PatchProjectCostingResource } from '@project-rouge/service-cost-client/src/endpoint/project/patch-project-costing-resource';
import type { ProjectCostingDomainModel } from '../model/project-costing';
import { ProjectCostingDomainModelFactory } from './project-costing';

describe(ProjectCostingDomainModelFactory.name, (): void => {
  describe('fromPatchProjectCostingResourcePayload()', (): void => {
    it('with payload, on_costs not provided, creates empty domain model', (): void => {
      const identity = fn<IdentityFactory>();
      identity.mockReturnValueOnce('test:value:identity');

      const factory = new ProjectCostingDomainModelFactory(identity);

      const payload: PatchProjectCostingResource.Payload = {};

      expect(
        factory.fromPatchProjectCostingResourcePayload(payload, 'test:value:project-id'),
      ).toStrictEqual<ProjectCostingDomainModel>({
        id: 'test:value:identity',

        project_id: 'test:value:project-id',

        on_cost_preliminiaries_percentage: undefined,
        on_cost_contingencies_percentage: undefined,
        on_cost_overheads_and_profits_percentage: undefined,
      });

      expect(identity).toBeCalledTimes(1);
    });

    it('with payload, on_costs, nothing inside, creates empty domain model', (): void => {
      const identity = fn<IdentityFactory>();
      identity.mockReturnValueOnce('test:value:identity');

      const factory = new ProjectCostingDomainModelFactory(identity);

      const payload: PatchProjectCostingResource.Payload = {
        on_costs: {},
      };

      expect(
        factory.fromPatchProjectCostingResourcePayload(payload, 'test:value:project-id'),
      ).toStrictEqual<ProjectCostingDomainModel>({
        id: 'test:value:identity',

        project_id: 'test:value:project-id',

        on_cost_preliminiaries_percentage: undefined,
        on_cost_contingencies_percentage: undefined,
        on_cost_overheads_and_profits_percentage: undefined,
      });

      expect(identity).toBeCalledTimes(1);
    });

    it('with payload, on_costs, all nulls, creates empty domain model', (): void => {
      const identity = fn<IdentityFactory>();
      identity.mockReturnValueOnce('test:value:identity');

      const factory = new ProjectCostingDomainModelFactory(identity);

      const payload: PatchProjectCostingResource.Payload = {
        on_costs: {
          preliminiaries_percentage: null,
          contingencies_percentage: null,
          overheads_and_profits_percentage: null,
        },
      };

      expect(
        factory.fromPatchProjectCostingResourcePayload(payload, 'test:value:project-id'),
      ).toStrictEqual<ProjectCostingDomainModel>({
        id: 'test:value:identity',

        project_id: 'test:value:project-id',

        on_cost_preliminiaries_percentage: undefined,
        on_cost_contingencies_percentage: undefined,
        on_cost_overheads_and_profits_percentage: undefined,
      });

      expect(identity).toBeCalledTimes(1);
    });

    it('with payload, on_costs, preliminaries provided only, creates empty domain model', (): void => {
      const identity = fn<IdentityFactory>();
      identity.mockReturnValueOnce('test:value:identity');

      const factory = new ProjectCostingDomainModelFactory(identity);

      const payload: PatchProjectCostingResource.Payload = {
        on_costs: {
          preliminiaries_percentage: 15,
        },
      };

      expect(
        factory.fromPatchProjectCostingResourcePayload(payload, 'test:value:project-id'),
      ).toStrictEqual<ProjectCostingDomainModel>({
        id: 'test:value:identity',

        project_id: 'test:value:project-id',

        on_cost_preliminiaries_percentage: 15,
        on_cost_contingencies_percentage: undefined,
        on_cost_overheads_and_profits_percentage: undefined,
      });

      expect(identity).toBeCalledTimes(1);
    });

    it('with payload, on_costs, all provided, creates empty domain model', (): void => {
      const identity = fn<IdentityFactory>();
      identity.mockReturnValueOnce('test:value:identity');

      const factory = new ProjectCostingDomainModelFactory(identity);

      const payload: PatchProjectCostingResource.Payload = {
        on_costs: {
          preliminiaries_percentage: 15,
          contingencies_percentage: 20,
          overheads_and_profits_percentage: 70,
        },
      };

      expect(
        factory.fromPatchProjectCostingResourcePayload(payload, 'test:value:project-id'),
      ).toStrictEqual<ProjectCostingDomainModel>({
        id: 'test:value:identity',

        project_id: 'test:value:project-id',

        on_cost_preliminiaries_percentage: 15,
        on_cost_contingencies_percentage: 20,
        on_cost_overheads_and_profits_percentage: 70,
      });

      expect(identity).toBeCalledTimes(1);
    });
  });

  describe('withPatchProjectCostingResourcePayload()', (): void => {
    it('with domain model, on_cost not provided, do nothing', (): void => {
      const identity = fn<IdentityFactory>();

      const factory = new ProjectCostingDomainModelFactory(identity);

      const model: ProjectCostingDomainModel = {
        id: 'test:value:identity',

        project_id: 'test:value:project-id',

        on_cost_preliminiaries_percentage: undefined,
        on_cost_contingencies_percentage: undefined,
        on_cost_overheads_and_profits_percentage: undefined,
      };

      expect(
        factory.withPatchProjectCostingResourcePayload(
          model,
          {},
        ),
      ).toStrictEqual<ProjectCostingDomainModel>({
        id: 'test:value:identity',

        project_id: 'test:value:project-id',

        on_cost_preliminiaries_percentage: undefined,
        on_cost_contingencies_percentage: undefined,
        on_cost_overheads_and_profits_percentage: undefined,
      });

      expect(identity).toBeCalledTimes(0);
    });

    it('with domain model, preliminaries provided, update preliminaries', (): void => {
      const identity = fn<IdentityFactory>();

      const factory = new ProjectCostingDomainModelFactory(identity);

      const model: ProjectCostingDomainModel = {
        id: 'test:value:identity',

        project_id: 'test:value:project-id',

        on_cost_preliminiaries_percentage: 15,
        on_cost_contingencies_percentage: undefined,
        on_cost_overheads_and_profits_percentage: undefined,
      };

      expect(
        factory.withPatchProjectCostingResourcePayload(
          model,
          {
            on_costs: {
              preliminiaries_percentage: 10,
            },
          },
        ),
      ).toStrictEqual<ProjectCostingDomainModel>({
        id: 'test:value:identity',

        project_id: 'test:value:project-id',

        on_cost_preliminiaries_percentage: 10,
        on_cost_contingencies_percentage: undefined,
        on_cost_overheads_and_profits_percentage: undefined,
      });

      expect(identity).toBeCalledTimes(0);
    });

    it('with domain model, contingencies is null, reset contingencies to undefined', (): void => {
      const identity = fn<IdentityFactory>();

      const factory = new ProjectCostingDomainModelFactory(identity);

      const model: ProjectCostingDomainModel = {
        id: 'test:value:identity',

        project_id: 'test:value:project-id',

        on_cost_preliminiaries_percentage: 1,
        on_cost_contingencies_percentage: 1,
        on_cost_overheads_and_profits_percentage: 1,
      };

      expect(
        factory.withPatchProjectCostingResourcePayload(
          model,
          {
            on_costs: {
              contingencies_percentage: null,
            },
          },
        ),
      ).toStrictEqual<ProjectCostingDomainModel>({
        id: 'test:value:identity',

        project_id: 'test:value:project-id',

        on_cost_preliminiaries_percentage: 1,
        on_cost_contingencies_percentage: undefined,
        on_cost_overheads_and_profits_percentage: 1,
      });

      expect(identity).toBeCalledTimes(0);
    });
  });
});
