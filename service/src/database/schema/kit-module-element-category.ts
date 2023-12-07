import { EntitySchema } from 'typeorm';
import type { KitModuleElementCategoryDatabaseRecord } from '../record/kit-module-element-category';
import { schema, TableName } from '../table';

export const KitModuleElementCategoryDatabaseSchema = new EntitySchema<KitModuleElementCategoryDatabaseRecord>({
  schema,
  name: TableName.KitModuleElementCategory,

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

    embodied_carbon_category: {
      name: 'embodied_carbon_category',
      type: 'varchar',
      length: 400,
      nullable: false,
    },

    embodied_carbon_sub_category: {
      name: 'embodied_carbon_sub_category',
      type: 'varchar',
      length: 400,
      nullable: false,
    },

    embodied_carbon_weight: {
      name: 'embodied_carbon_weight',
      type: 'numeric',
      nullable: false,
    },

    module_element_reference: {
      name: 'module_element_reference',
      type: 'varchar',
      length: 200,
      nullable: false,
    },

    created_at: {
      name: 'created_at',
      type: 'timestamp',
      nullable: false,
    },
  },
});
