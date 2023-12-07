import type { KitBaseBuildElementReferenceDatabaseRepository } from '../../database/repository/kit-base-build-element-reference';
import type { KitModuleDatabaseRepository } from '../../database/repository/kit-module';
import type { KitModuleBillOfMaterialDatabaseRepository } from '../../database/repository/kit-module-bill-of-material';
import type { KitModuleElementCategoryDatabaseRepository } from '../../database/repository/kit-module-element-category';
import type { KitModuleElementReferenceDatabaseRepository } from '../../database/repository/kit-module-element-reference';
import type { KitOptionDatabaseRepository } from '../../database/repository/kit-option';
import type { KitUnitDatabaseRepository } from '../../database/repository/kit-unit';
import type { KitUnitModuleDatabaseRepository } from '../../database/repository/kit-unit-module';
import type { KitBaseBuildElementReferenceDomainModelFactory } from '../../domain/factory/kit-base-build-element-reference';
import type { KitModuleDomainModelFactory } from '../../domain/factory/kit-module';
import type { KitModuleBillOfMaterialDomainModelFactory } from '../../domain/factory/kit-module-bill-of-material';
import type { KitModuleElementCategoryDomainModelFactory } from '../../domain/factory/kit-module-element-category';
import type { KitModuleElementReferenceDomainModelFactory } from '../../domain/factory/kit-module-element-reference';
import type { KitOptionDomainModelFactory } from '../../domain/factory/kit-option';
import type { KitUnitDomainModelFactory } from '../../domain/factory/kit-unit';
import type { KitUnitModuleDomainModelFactory } from '../../domain/factory/kit-unit-module';
import type { KitModuleDomainModel } from '../../domain/model/kit-module';
import type { KitUnitDomainModel } from '../../domain/model/kit-unit';
import type { SnowflakeClient } from './client';
import { createBaseBuildElementReferenceFeedItemQueryExecutor } from './table/kit-base-build-element-reference';
import { createModuleFeedItemQueryExecutor } from './table/kit-module';
import { createModuleBillOfMaterialFeedItemQueryExecutor } from './table/kit-module-bill-of-material';
import { createModuleElementCategoryFeedItemQueryExecutor } from './table/kit-module-element-category';
import { createModuleElementReferenceFeedItemQueryExecutor } from './table/kit-module-element-reference';
import { createOptionFeedItemQueryExecutor } from './table/kit-option';
import { createUnitFeedItemQueryExecutor } from './table/kit-unit';
import { createUnitModuleFeedItemQueryExecutor } from './table/kit-unit-module';

const isArraySame = (a: string[], b: string[]) => {
  if (a.length !== b.length) {
    return false;
  }

  const aa = JSON.stringify(a.sort());
  const bb = JSON.stringify(b.sort());

  if (aa.length !== bb.length) {
    return false;
  }

  return aa === bb;
};

export type Lookup = Record<string, string>;

export const find = (lookup: Lookup, key: string): string => {
  const value = lookup[key];

  if (value !== undefined) {
    return value;
  }

  throw new Error(`Could not find key "${key}"`);
};

export type SynchroniseRecordStorage = {
  readonly modules: KitModuleDomainModel[];
  readonly units: KitUnitDomainModel[];
};

export const synchroniseModuleFeedItems = async (
  client: SnowflakeClient,
  repository: KitModuleDatabaseRepository,
  factory: KitModuleDomainModelFactory,
): Promise<Lookup> => {
  const items = await createModuleFeedItemQueryExecutor()(client);
  const itemSourceIds = items.valid.results.map((result) => result.source_id);

  const records = await repository.findAllBySourceIds(itemSourceIds);

  const lookup: Lookup = {};

  for await (const result of items.valid.results) {
    const found = records.find((x) => {
      return x.source_id === result.source_id;
    });

    if (found !== undefined) {
      lookup[result.source_id] = found.id;

      let update = false;

      if (found.label !== result.data.module_name) {
        // eslint-disable-next-line no-console
        console.dir({
          action: 'synchronise',
          reason: 'label',
          found,
          result,
        }, { depth: null });

        update = true;
      }

      if (update === true) {
        const model = factory.withFeedItemDataSanitised(found, result.source_updated_at, {
          module_name: result.data.module_name,
        });

        await repository.update(model);
      }

      continue;
    }

    const model = factory.fromFeedItemSanitised(result);

    lookup[result.source_id] = model.id;

    await repository.create(model);
  }

  return lookup;
};

export const synchroniseUnitFeedItems = async (
  client: SnowflakeClient,
  repository: KitUnitDatabaseRepository,
  factory: KitUnitDomainModelFactory,
): Promise<Lookup> => {
  const items = await createUnitFeedItemQueryExecutor()(client);
  const itemSourceIds = items.valid.results.map((result) => result.source_id);

  const records = await repository.findAllBySourceIds(itemSourceIds);

  const lookup: Lookup = {};

  for await (const result of items.valid.results) {
    const found = records.find((x) => {
      return x.source_id === result.source_id;
    });

    if (found !== undefined) {
      lookup[result.source_id] = found.id;

      let update = false;

      if (found.label !== result.data.unit_name) {
        // eslint-disable-next-line no-console
        console.dir({
          action: 'synchronise',
          reason: 'label',
          found,
          result,
        }, { depth: null });

        update = true;
      }

      if (update === true) {
        const model = factory.withFeedItemDataSanitised(found, result.source_updated_at, {
          unit_name: result.data.unit_name,
        });

        await repository.update(model);
      }

      continue;
    }

    const model = factory.fromFeedItemSanitised(result);

    lookup[result.source_id] = model.id;

    await repository.create(model);
  }

  return lookup;
};

type UnitModuleLookupMapping = {
  units: Lookup;
  modules: Lookup;
};

export const synchroniseUnitModuleFeedItems = async (
  client: SnowflakeClient,
  repository: KitUnitModuleDatabaseRepository,
  factory: KitUnitModuleDomainModelFactory,
  mapping: UnitModuleLookupMapping,
): Promise<void> => {
  const items = await createUnitModuleFeedItemQueryExecutor()(client);
  const itemSourceIds = items.valid.results.map((result) => result.source_id);

  const records = await repository.findAllBySourceIds(itemSourceIds);

  for await (const result of items.valid.results) {
    const found = records.find((x) => {
      return x.source_id === result.source_id;
    });

    if (found !== undefined) {
      let update = false;

      const lookupUnitId = find(mapping.units, result.data.unit_id);
      const lookupModuleId = find(mapping.modules, result.data.module_id);

      if (found.kit_unit_id !== lookupUnitId) {
        // eslint-disable-next-line no-console
        console.dir({
          action: 'synchronise',
          reason: 'kit_unit_id',
          found,
          result,
        }, { depth: null });

        update = true;
      }

      if (found.kit_module_id !== lookupModuleId) {
        // eslint-disable-next-line no-console
        console.dir({
          action: 'synchronise',
          reason: 'kit_module_id',
          found,
          result,
        }, { depth: null });

        update = true;
      }

      if (found.quantity !== result.data.module_quantity) {
        // eslint-disable-next-line no-console
        console.dir({
          action: 'synchronise',
          reason: 'quantity',
          found,
          result,
        }, { depth: null });

        update = true;
      }

      if (update === true) {
        const model = factory.withFeedItemDataSanitised(found, result.source_updated_at, {
          unit_id: lookupUnitId,
          module_id: lookupModuleId,

          module_quantity: result.data.module_quantity,
        });

        await repository.update(model);
      }

      continue;
    }

    try {
      const model = factory.withFeedItemDataSanitised(
        factory.fromFeedItemSanitised(result),
        result.source_updated_at,
        {
          unit_id: find(mapping.units, result.data.unit_id),
          module_id: find(mapping.modules, result.data.module_id),

          module_quantity: result.data.module_quantity,
        },
      );

      await repository.create(model);
    } catch (e: unknown) {
      // eslint-disable-next-line no-console
      console.dir({ result }, { depth: null });

      throw e;
    }
  }
};

export const synchroniseModuleElementReferenceFeedItems = async (
  client: SnowflakeClient,
  repository: KitModuleElementReferenceDatabaseRepository,
  factory: KitModuleElementReferenceDomainModelFactory,
): Promise<Lookup> => {
  const items = await createModuleElementReferenceFeedItemQueryExecutor()(client);
  const itemSourceIds = items.valid.results.map((result) => result.source_id);

  const records = await repository.findAllBySourceIds(itemSourceIds);

  const lookup: Lookup = {};

  for await (const result of items.valid.results) {
    const found = records.find((x) => {
      return x.source_id === result.source_id;
    });

    if (found !== undefined) {
      lookup[result.source_id] = found.id;

      let update = false;

      if (found.assembly_or_group !== result.data.assembly_or_group) {
        // eslint-disable-next-line no-console
        console.dir({
          action: 'synchronise',
          reason: 'assembly_or_group',
          found,
          result,
        }, { depth: null });

        update = true;
      }

      if (found.cost_plan_section !== result.data.cost_plan_section) {
        // eslint-disable-next-line no-console
        console.dir({
          action: 'synchronise',
          reason: 'cost_plan_section',
          found,
          result,
        }, { depth: null });

        update = true;
      }

      if (found.index_group !== result.data.index_group) {
        // eslint-disable-next-line no-console
        console.dir({
          action: 'synchronise',
          reason: 'index_group',
          found,
          result,
        }, { depth: null });

        update = true;
      }

      if (found.index_group_item !== result.data.index_group_item) {
        // eslint-disable-next-line no-console
        console.dir({
          action: 'synchronise',
          reason: 'index_group_item',
          found,
          result,
        }, { depth: null });

        update = true;
      }

      if (found.index_group_item !== result.data.index_group_item) {
        // eslint-disable-next-line no-console
        console.dir({
          action: 'synchronise',
          reason: 'index_group_item',
          found,
          result,
        }, { depth: null });

        update = true;
      }

      if (found.rate_cost_tall_building !== result.data.rate_tall_building) {
        // eslint-disable-next-line no-console
        console.dir({
          action: 'synchronise',
          reason: 'rate_cost_tall_building',
          found,
          result,
        }, { depth: null });

        update = true;
      }

      if (found.rate_carbon !== result.data.embodied_carbon_rate) {
        // eslint-disable-next-line no-console
        console.dir({
          action: 'synchronise',
          reason: 'rate_carbon',
          found,
          result,
        }, { depth: null });

        update = true;
      }

      if (found.unit_of_measurement !== result.data.unit_of_measurement) {
        // eslint-disable-next-line no-console
        console.dir({
          action: 'synchronise',
          reason: 'unit_of_measurement',
          found,
          result,
        }, { depth: null });

        update = true;
      }

      if (isArraySame(found.percentage_targets ?? [], result.data.related_elements_for_percent_items ?? []) === false) {
        // eslint-disable-next-line no-console
        console.dir({
          action: 'synchronise',
          reason: 'result',
          found,
          result,
        }, { depth: null });

        update = true;
      }

      if (isArraySame(found.option_groups ?? [], result.data.option_group_and_value_ids ?? []) === false) {
        // eslint-disable-next-line no-console
        console.dir({
          action: 'synchronise',
          reason: 'option_group_and_value_ids',
          found,
          result,
        }, { depth: null });

        update = true;
      }

      if (update === true) {
        const model = factory.withFeedItemDataSanitised(found, result.source_updated_at, {
          assembly_or_group: result.data.assembly_or_group,
          cost_plan_section: result.data.cost_plan_section,
          embodied_carbon_rate: result.data.embodied_carbon_rate,
          index_group: result.data.index_group,
          index_group_item: result.data.index_group_item,
          option_group_and_value_ids: result.data.option_group_and_value_ids,
          option_count: result.data.option_count,
          rate: result.data.rate,
          rate_tall_building: result.data.rate_tall_building,
          related_elements_for_percent_items: result.data.related_elements_for_percent_items,
          unit_of_measurement: result.data.unit_of_measurement,
        });

        await repository.update(model);
      }

      continue;
    }

    try {
      const model = factory.withFeedItemDataSanitised(
        factory.fromFeedItemSanitised(result),
        result.source_updated_at,
        {
          assembly_or_group: result.data.assembly_or_group,
          cost_plan_section: result.data.cost_plan_section,
          embodied_carbon_rate: result.data.embodied_carbon_rate,
          index_group: result.data.index_group,
          index_group_item: result.data.index_group_item,
          option_group_and_value_ids: result.data.option_group_and_value_ids,
          option_count: result.data.option_count,
          rate: result.data.rate,
          rate_tall_building: result.data.rate_tall_building,
          related_elements_for_percent_items: result.data.related_elements_for_percent_items,
          unit_of_measurement: result.data.unit_of_measurement,
        },
      );

      lookup[result.source_id] = model.id;

      await repository.create(model);
    } catch (e: unknown) {
      // eslint-disable-next-line no-console
      console.dir({ result }, { depth: null });

      throw e;
    }
  }

  return lookup;
};

type ModuleBillOfMaterialLookupMapping = {
  modules: Lookup;
  moduleElementReferences: Lookup;
};

export const synchroniseModuleBillOfMaterialFeedItems = async (
  client: SnowflakeClient,
  repository: KitModuleBillOfMaterialDatabaseRepository,
  factory: KitModuleBillOfMaterialDomainModelFactory,
  mapping: ModuleBillOfMaterialLookupMapping,
): Promise<void> => {
  const items = await createModuleBillOfMaterialFeedItemQueryExecutor()(client);
  const itemSourceIds = items.valid.results.map((result) => result.source_id);

  const records = await repository.findAllBySourceIds(itemSourceIds);

  for await (const result of items.valid.results) {
    const found = records.find((x) => {
      return x.source_id === result.source_id;
    });

    if (found !== undefined) {
      let update = false;

      const lookupModuleId = find(mapping.modules, result.data.module_id);
      const lookupModuleElementReferenceId = find(mapping.moduleElementReferences, result.data.modular_element_id);

      if (found.kit_module_element_reference_id !== lookupModuleElementReferenceId) {
        // eslint-disable-next-line no-console
        console.dir({
          action: 'synchronise',
          reason: 'kit_module_element_reference_id',
          found,
          result,
        }, { depth: null });

        update = true;
      }

      if (found.kit_module_id !== lookupModuleId) {
        // eslint-disable-next-line no-console
        console.dir({
          action: 'synchronise',
          reason: 'kit_module_id',
          found,
          result,
        }, { depth: null });

        update = true;
      }

      if (found.quantity !== result.data.quantity_actual) {
        // eslint-disable-next-line no-console
        console.dir({
          action: 'synchronise',
          reason: 'quantity',
          found,
          result,
        }, { depth: null });

        update = true;
      }

      if (found.rate_cost !== result.data.line_cost) {
        // eslint-disable-next-line no-console
        console.dir({
          action: 'synchronise',
          reason: 'rate_cost',
          found,
          result,
        }, { depth: null });

        update = true;
      }

      if (found.rate_carbon !== result.data.embodied_carbon_line_cost) {
        // eslint-disable-next-line no-console
        console.dir({
          action: 'synchronise',
          reason: 'rate_carbon',
          found,
          result,
        }, { depth: null });

        update = true;
      }

      if (update === true) {
        const model = factory.withFeedItemDataSanitised(found, result.source_updated_at, {
          embodied_carbon_line_cost: result.data.embodied_carbon_line_cost,
          line_cost: result.data.line_cost,
          modular_element_id: lookupModuleElementReferenceId,
          module_id: lookupModuleId,
          quantity_actual: result.data.quantity_actual,
        });

        await repository.update(model);
      }

      continue;
    }

    try {
      const model = factory.withFeedItemDataSanitised(
        factory.fromFeedItemSanitised(result),
        result.source_updated_at,
        {
          embodied_carbon_line_cost: result.data.embodied_carbon_line_cost,
          line_cost: result.data.line_cost,
          modular_element_id: find(mapping.moduleElementReferences, result.data.modular_element_id),
          module_id: find(mapping.modules, result.data.module_id),
          quantity_actual: result.data.quantity_actual,
        },
      );

      await repository.create(model);
    } catch (e: unknown) {
      // eslint-disable-next-line no-console
      console.dir({ result }, { depth: null });

      throw e;
    }
  }
};

export const synchroniseBaseBuildElementReferenceFeedItems = async (
  client: SnowflakeClient,
  repository: KitBaseBuildElementReferenceDatabaseRepository,
  factory: KitBaseBuildElementReferenceDomainModelFactory,
): Promise<void> => {
  const items = await createBaseBuildElementReferenceFeedItemQueryExecutor()(client);
  const itemSourceIds = items.valid.results.map((result) => result.source_id);

  const records = await repository.findAllBySourceIds(itemSourceIds);

  for await (const result of items.valid.results) {
    const found = records.find((x) => {
      return x.source_id === result.source_id;
    });

    if (found !== undefined) {
      let update = false;

      if (found.index_group !== result.data.index_group) {
        // eslint-disable-next-line no-console
        console.dir({
          action: 'synchronise',
          reason: 'index_group',
          found,
          result,
        }, { depth: null });

        update = true;
      }

      if (found.index_group_item !== result.data.index_group_item) {
        // eslint-disable-next-line no-console
        console.dir({
          action: 'synchronise',
          reason: 'index_group_item',
          found,
          result,
        }, { depth: null });

        update = true;
      }

      if ((found.area_adjustment ?? null) !== result.data.area_adjustment) {
        // eslint-disable-next-line no-console
        console.dir({
          action: 'synchronise',
          reason: 'area_adjustment',
          found,
          result,
        }, { depth: null });

        update = true;
      }

      if ((found.building_data_target ?? null) !== result.data.area_or_quantity_type) {
        // eslint-disable-next-line no-console
        console.dir({
          action: 'synchronise',
          reason: 'building_data_target',
          found,
          result,
        }, { depth: null });

        update = true;
      }

      if (isArraySame(found.building_height_breakpoints, result.data.building_height_breakpoints) === false) {
        // eslint-disable-next-line no-console
        console.dir({
          action: 'synchronise',
          reason: 'building_height_breakpoints',
          found,
          result,
        }, { depth: null });

        update = true;
      }

      if (found.unit_of_measurement !== result.data.unit_of_measurement) {
        // eslint-disable-next-line no-console
        console.dir({
          action: 'synchronise',
          reason: 'unit_of_measurement',
          found,
          result,
        }, { depth: null });

        update = true;
      }

      if (isArraySame(found.percentage_targets ?? [], result.data.related_elements_for_percent_items ?? []) === false) {
        // eslint-disable-next-line no-console
        console.dir({
          action: 'synchronise',
          reason: 'related_elements_for_percent_items',
          found,
          result,
        }, { depth: null });

        update = true;
      }

      if (isArraySame(found.option_groups ?? [], result.data.option_group_and_value_ids ?? []) === false) {
        // eslint-disable-next-line no-console
        console.dir({
          action: 'synchronise',
          reason: 'option_group_and_value_ids',
          found,
          result,
        }, { depth: null });

        update = true;
      }

      if (found.rate_cost !== result.data.rate) {
        // eslint-disable-next-line no-console
        console.dir({
          action: 'synchronise',
          reason: 'rate_cost',
          found,
          result,
        }, { depth: null });

        update = true;
      }

      if (found.rate_carbon !== result.data.embodied_carbon_rate) {
        // eslint-disable-next-line no-console
        console.dir({
          action: 'synchronise',
          reason: 'rate_carbon',
          found,
          result,
        }, { depth: null });

        update = true;
      }

      if (update === true) {
        const model = factory.withFeedItemDataSanitised(found, result.source_updated_at, {
          area_adjustment: result.data.area_adjustment,
          area_or_quantity_type: result.data.area_or_quantity_type,
          embodied_carbon_rate: result.data.embodied_carbon_rate,
          index_group: result.data.index_group,
          index_group_item: result.data.index_group_item,
          option_count: result.data.option_count,
          option_group_and_value_ids: result.data.option_group_and_value_ids,
          rate: result.data.rate,
          related_elements_for_percent_items: result.data.related_elements_for_percent_items,
          unit_of_measurement: result.data.unit_of_measurement,
          building_height_breakpoints: result.data.building_height_breakpoints,
        });

        await repository.update(model);
      }

      continue;
    }

    try {
      const model = factory.withFeedItemDataSanitised(
        factory.fromFeedItemDataSanitised(result),
        result.source_updated_at,
        {
          area_adjustment: result.data.area_adjustment,
          area_or_quantity_type: result.data.area_or_quantity_type,
          embodied_carbon_rate: result.data.embodied_carbon_rate,
          index_group: result.data.index_group,
          index_group_item: result.data.index_group_item,
          option_count: result.data.option_count,
          option_group_and_value_ids: result.data.option_group_and_value_ids,
          rate: result.data.rate,
          related_elements_for_percent_items: result.data.related_elements_for_percent_items,
          unit_of_measurement: result.data.unit_of_measurement,
          building_height_breakpoints: result.data.building_height_breakpoints,
        },
      );

      await repository.create(model);
    } catch (e: unknown) {
      // eslint-disable-next-line no-console
      console.dir({ result }, { depth: null });

      throw e;
    }
  }
};

export const synchroniseOptionFeedItems = async (
  client: SnowflakeClient,
  repository: KitOptionDatabaseRepository,
  factory: KitOptionDomainModelFactory,
): Promise<void> => {
  const items = await createOptionFeedItemQueryExecutor()(client);

  const itemSourceIds = items.valid.results.map((result) => result.source_id);

  const records = await repository.findAllBySourceIds(itemSourceIds);

  for await (const result of items.valid.results) {
    const found = records.find((x) => {
      return x.source_id === result.source_id;
    });

    if (found !== undefined) {
      let update = false;

      if (found.option_group_and_value !== result.data.option_group_and_value) {
        // eslint-disable-next-line no-console
        console.dir({
          action: 'synchronise',
          reason: 'option_group_and_value',
          found,
          result,
        }, { depth: null });

        update = true;
      }

      if (found.is_default_option_value !== result.data.default_within_group) {
        // eslint-disable-next-line no-console
        console.dir({
          action: 'synchronise',
          reason: 'is_default_option_value',
          found,
          result,
        }, { depth: null });

        update = true;
      }

      if (found.base_build_element_reference_ids !== result.data.base_build_element_reference) {
        // eslint-disable-next-line no-console
        console.dir({
          action: 'synchronise',
          reason: 'base_build_element_reference',
          found,
          result,
        }, { depth: null });

        update = true;
      }

      if (found.module_element_reference_ids !== result.data.module_element_reference) {
        // eslint-disable-next-line no-console
        console.dir({
          action: 'synchronise',
          reason: 'module_element_reference',
          found,
          result,
        }, { depth: null });

        update = true;
      }

      if (update === true) {
        const model = factory.withFeedItemDataSanitised(found, result.source_updated_at, {
          option_group_and_value: result.data.option_group_and_value,
          default_within_group: result.data.default_within_group,
          base_build_element_reference: result.data.base_build_element_reference,
          module_element_reference: result.data.module_element_reference,
        });

        await repository.update(model);
      }

      continue;
    }

    try {
      const model = factory.withFeedItemDataSanitised(
        factory.fromFeedItemSanitised(result),
        result.source_updated_at,
        {
          option_group_and_value: result.data.option_group_and_value,
          default_within_group: result.data.default_within_group,
          base_build_element_reference: result.data.base_build_element_reference,
          module_element_reference: result.data.module_element_reference,
        },
      );

      await repository.create(model);
    } catch (e: unknown) {
      // eslint-disable-next-line no-console
      console.dir({ result }, { depth: null });

      throw e;
    }
  }
};

export const synchroniseModularElementCategoryItems = async (
  client: SnowflakeClient,
  repository: KitModuleElementCategoryDatabaseRepository,
  factory: KitModuleElementCategoryDomainModelFactory,
): Promise<void> => {
  const items = await createModuleElementCategoryFeedItemQueryExecutor()(client);

  const itemSourceIds = items.valid.results.map((result) => result.source_id);

  const records = await repository.findAllBySourceIds(itemSourceIds);

  for await (const result of items.valid.results) {
    const found = records.find((x) => {
      return x.source_id === result.source_id;
    });

    if (found !== undefined) {
      let update = false;

      if (found.embodied_carbon_category !== result.data.embodied_carbon_category) {
        // eslint-disable-next-line no-console
        console.dir({
          action: 'synchronise',
          reason: 'embodied_carbon_category',
          found,
          result,
        }, { depth: null });

        update = true;
      }

      if (found.embodied_carbon_sub_category !== result.data.embodied_carbon_sub_category) {
        // eslint-disable-next-line no-console
        console.dir({
          action: 'synchronise',
          reason: 'embodied_carbon_sub_category',
          found,
          result,
        }, { depth: null });

        update = true;
      }

      if (found.embodied_carbon_weight !== result.data.embodied_carbon_weight) {
        // eslint-disable-next-line no-console
        console.dir({
          action: 'synchronise',
          reason: 'embodied_carbon_weight',
          found,
          result,
        }, { depth: null });

        update = true;
      }

      if (found.module_element_reference !== result.data.module_element_reference) {
        // eslint-disable-next-line no-console
        console.dir({
          action: 'synchronise',
          reason: 'module_element_reference',
          found,
          result,
        }, { depth: null });

        update = true;
      }

      if (update === true) {
        const model = factory.withFeedItemDataSanitised(found, result.source_updated_at, {
          embodied_carbon_category: result.data.embodied_carbon_category,
          embodied_carbon_sub_category: result.data.embodied_carbon_sub_category,
          embodied_carbon_weight: result.data.embodied_carbon_weight,
          module_element_reference: result.data.module_element_reference,
        });

        await repository.update(model);
      }

      continue;
    }

    try {
      const model = factory.withFeedItemDataSanitised(
        factory.fromFeedItemSanitised(result),
        result.source_updated_at,
        {
          embodied_carbon_category: result.data.embodied_carbon_category,
          embodied_carbon_sub_category: result.data.embodied_carbon_sub_category,
          embodied_carbon_weight: result.data.embodied_carbon_weight,
          module_element_reference: result.data.module_element_reference,
        },
      );

      await repository.create(model);
    } catch (e: unknown) {
      // eslint-disable-next-line no-console
      console.dir({ result }, { depth: null });

      throw e;
    }
  }
};
