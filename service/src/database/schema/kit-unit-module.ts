import { EntitySchema } from 'typeorm';
import type { KitUnitModuleDatabaseRecord } from '../record/kit-unit-module';
import { schema, TableName } from '../table';

export const KitUnitModuleDatabaseSchema = new EntitySchema<KitUnitModuleDatabaseRecord>({
  schema,
  name: TableName.KitUnitModule,

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

    quantity: {
      name: 'quantity',
      type: 'integer',
      nullable: false,
    },

    created_at: {
      name: 'created_at',
      type: 'timestamp',
      nullable: false,
    },
  },

  relations: {
    kit_unit: {
      type: 'many-to-one',
      target: TableName.KitUnit,

      joinColumn: {
        name: 'kit_unit_id',
        referencedColumnName: 'id',
      },

      lazy: false,
      eager: false,
      nullable: false,

      onUpdate: 'NO ACTION',
      onDelete: 'CASCADE',
    },

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
  },

  relationIds: {
    kit_unit_id: {
      relationName: 'kit_unit',
    },

    kit_module_id: {
      relationName: 'kit_module',
    },
  },
});
