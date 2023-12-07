import { EntitySchema } from 'typeorm';
import type { KitUnitDatabaseRecord } from '../record/kit-unit';
import { schema, TableName } from '../table';

export const KitUnitDatabaseSchema = new EntitySchema<KitUnitDatabaseRecord>({
  schema,
  name: TableName.KitUnit,

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

    label: {
      name: 'label',
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

  indices: [
    { columns: ['source_id'], unique: true },
    { columns: ['source_updated_at'] },
    { columns: ['created_at'] },
  ],
});
