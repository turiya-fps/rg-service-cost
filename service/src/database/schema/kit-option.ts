import { EntitySchema } from 'typeorm';
import type { KitOptionDatabaseRecord } from '../record/kit-option';
import { schema, TableName } from '../table';

export const KitOptionDatabaseSchema = new EntitySchema<KitOptionDatabaseRecord>({
  schema,
  name: TableName.KitOption,

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

    option_group_and_value: {
      name: 'option_group_and_value',
      type: 'varchar',
      nullable: false,
    },

    is_default_option_value: {
      name: 'is_default_option_value',
      type: 'boolean',
      nullable: false,
    },

    base_build_element_reference_ids: {
      name: 'base_build_element_reference_ids',
      type: 'varchar',
      array: true,
      nullable: true,
    },

    module_element_reference_ids: {
      name: 'module_element_reference_ids',
      type: 'varchar',
      array: true,
      nullable: true,
    },

    created_at: {
      name: 'created_at',
      type: 'timestamp',
      nullable: false,
    },
  },

  indices: [
    { columns: ['source_id'], unique: true },
    { columns: ['source_updated_at'] },
    { columns: ['created_at'] },
  ],
});
