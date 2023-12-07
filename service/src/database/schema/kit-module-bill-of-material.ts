import { EntitySchema } from 'typeorm';
import type { KitModuleBillOfMaterialDatabaseRecord } from '../record/kit-module-bill-of-material';
import { schema, TableName } from '../table';

export const KitModuleBillOfMaterialDatabaseSchema = new EntitySchema<KitModuleBillOfMaterialDatabaseRecord>({
  schema,
  name: TableName.KitModuleBillOfMaterial,

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

    quantity: {
      name: 'quantity',
      type: 'numeric',
      nullable: false,
    },

    created_at: {
      name: 'created_at',
      type: 'timestamp',
      nullable: false,
    },
  },

  relations: {
    kit_module: {
      type: 'many-to-one',
      target: TableName.KitModule,

      joinColumn: {
        name: 'kit_module_id',
        referencedColumnName: 'id',
      },

      lazy: false,
      eager: false,
      nullable: false,

      onUpdate: 'NO ACTION',
      onDelete: 'CASCADE',
    },

    kit_module_element_reference: {
      type: 'many-to-one',
      target: TableName.KitModuleElementReference,

      joinColumn: {
        name: 'kit_module_element_reference_id',
        referencedColumnName: 'id',
      },

      lazy: false,
      eager: false,
      nullable: false,

      onUpdate: 'NO ACTION',
      onDelete: 'CASCADE',
    },
  },

  relationIds: {
    kit_module_id: {
      relationName: 'kit_module',
    },

    kit_module_element_reference_id: {
      relationName: 'kit_module_element_reference',
    },
  },
});
