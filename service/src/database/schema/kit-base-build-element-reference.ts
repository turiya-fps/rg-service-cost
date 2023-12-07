import { EntitySchema } from 'typeorm';
import type { KitBaseBuildElementReferenceDatabaseRecord } from '../record/kit-base-build-element-reference';
import { schema, TableName } from '../table';

export const KitBaseBuildElementReferenceDatabaseSchema = new EntitySchema<KitBaseBuildElementReferenceDatabaseRecord>({
  schema,
  name: TableName.KitBaseBuildElementReference,

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

    area_adjustment: {
      name: 'area_adjustment',
      type: 'numeric',
      nullable: true,
    },

    building_data_target: {
      name: 'building_data_target',
      type: 'varchar',
      length: 50,
      nullable: true,
    },

    building_height_breakpoints: {
      name: 'building_height_breakpoints',
      type: 'varchar',
      array: true,
      default: [],
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
