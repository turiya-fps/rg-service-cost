import { EntitySchema } from 'typeorm';
import type { KitModuleElementReferenceDatabaseRecord } from '../record/kit-module-element-reference';
import { schema, TableName } from '../table';

export const KitModuleElementReferenceDatabaseSchema = new EntitySchema<KitModuleElementReferenceDatabaseRecord>({
  schema,
  name: TableName.KitModuleElementReference,

  columns: {
    id: {
      name: 'id',
      type: 'uuid',
      primary: true,
      nullable: false,
    },

    source_id: {
      name: 'source_id',
      type: 'varchar',
      length: 200,
      nullable: false,
      unique: true,
    },

    source_updated_at: {
      name: 'source_updated_at',
      type: 'timestamp',
      nullable: false,
    },

    index_group: {
      name: 'index_group',
      type: 'varchar',
      length: 5,
      nullable: false,
    },

    index_group_item: {
      name: 'index_group_item',
      type: 'varchar',
      length: 5,
      nullable: false,
    },

    assembly_or_group: {
      name: 'assembly_or_group',
      type: 'varchar',
      length: 100,
      nullable: false,
    },

    cost_plan_section: {
      name: 'cost_plan_section',
      type: 'varchar',
      length: 100,
      nullable: false,
    },

    unit_of_measurement: {
      name: 'unit_of_measurement',
      type: 'varchar',
      length: 50,
      nullable: false,
    },

    /**
     * @example `00,000,000.0000`
     */
    rate_cost: {
      name: 'rate_cost',
      type: 'decimal',
      precision: 12,
      scale: 4,
      nullable: false,
    },

    /**
     * @example `00,000,000.0000`
     */
    rate_cost_tall_building: {
      name: 'rate_cost_tall_building',
      type: 'decimal',
      precision: 12,
      scale: 4,
      nullable: false,
      default: 0,
    },

    /**
     * @example `00,000,000.0000`
     */
    rate_carbon: {
      name: 'rate_carbon',
      type: 'decimal',
      precision: 12,
      scale: 4,
      nullable: false,
    },

    option_group_ids: {
      name: 'option_group_ids',
      type: 'varchar',
      length: 400,
      array: true,
      nullable: true,
    },

    option_count: {
      name: 'option_count',
      type: 'int',
      nullable: false,
      default: 0,
    },

    percentage_targets: {
      name: 'percentage_targets',
      type: 'jsonb',
      nullable: true,
    },

    created_at: {
      name: 'created_at',
      type: 'timestamp',
      nullable: false,
    },
  },
});
