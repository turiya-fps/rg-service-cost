import type { EntitySchema } from 'typeorm';
import { KitBaseBuildElementReferenceDatabaseSchema } from './schema/kit-base-build-element-reference';
import { KitModuleDatabaseSchema } from './schema/kit-module';
import { KitModuleBillOfMaterialDatabaseSchema } from './schema/kit-module-bill-of-material';
import { KitModuleElementCategoryDatabaseSchema } from './schema/kit-module-element-category';
import { KitModuleElementReferenceDatabaseSchema } from './schema/kit-module-element-reference';
import { KitOptionDatabaseSchema } from './schema/kit-option';
import { KitUnitDatabaseSchema } from './schema/kit-unit';
import { KitUnitModuleDatabaseSchema } from './schema/kit-unit-module';
import { ProjectCostingDatabaseSchema } from './schema/project-costing';

/**
 * Register all entities (as schemas) that TypeORM should be aware of here.
 *
 * This list is maintained manually because the string searching is deprecated and slow.
 * Another reason comes down to where the command is ran because of TypeORM CLI issues and the relative file paths.
 * These issues may be resolved in future but until now all entities should be mentioned here.
 */
export const schemas: EntitySchema[] = [
  KitUnitDatabaseSchema,
  KitUnitModuleDatabaseSchema,
  KitModuleDatabaseSchema,
  KitModuleElementReferenceDatabaseSchema,
  KitModuleBillOfMaterialDatabaseSchema,
  KitBaseBuildElementReferenceDatabaseSchema,
  KitOptionDatabaseSchema,
  KitModuleElementCategoryDatabaseSchema,

  ProjectCostingDatabaseSchema,
];
