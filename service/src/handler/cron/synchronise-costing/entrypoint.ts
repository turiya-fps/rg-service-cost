import { aws } from '@phasma/handler-aws';
import { date } from '@project-rouge/service-core/data/date';
import { identity } from '@project-rouge/service-core/data/identity';
import { getEnvironmentVariable } from '@project-rouge/service-core/environment';
import type { PostgresConnectionDetailsEnvironmentMapping } from '@project-rouge/service-core/environment/database/postgres';
import type { RuntimeEnvironmentMapping } from '@project-rouge/service-core/environment/runtime';
import { resolveRuntimeTypeFromEnvironment } from '@project-rouge/service-core/environment/runtime';
import { createDatabaseConnectionManager } from '../../../database/connection';
import { KitBaseBuildElementReferenceDatabaseRepository } from '../../../database/repository/kit-base-build-element-reference';
import { KitModuleDatabaseRepository } from '../../../database/repository/kit-module';
import { KitModuleBillOfMaterialDatabaseRepository } from '../../../database/repository/kit-module-bill-of-material';
import { KitModuleElementCategoryDatabaseRepository } from '../../../database/repository/kit-module-element-category';
import { KitModuleElementReferenceDatabaseRepository } from '../../../database/repository/kit-module-element-reference';
import { KitOptionDatabaseRepository } from '../../../database/repository/kit-option';
import { KitUnitDatabaseRepository } from '../../../database/repository/kit-unit';
import { KitUnitModuleDatabaseRepository } from '../../../database/repository/kit-unit-module';
import { KitBaseBuildElementReferenceDomainModelFactory } from '../../../domain/factory/kit-base-build-element-reference';
import { KitModuleDomainModelFactory } from '../../../domain/factory/kit-module';
import { KitModuleBillOfMaterialDomainModelFactory } from '../../../domain/factory/kit-module-bill-of-material';
import { KitModuleElementCategoryDomainModelFactory } from '../../../domain/factory/kit-module-element-category';
import { KitModuleElementReferenceDomainModelFactory } from '../../../domain/factory/kit-module-element-reference';
import { KitOptionDomainModelFactory } from '../../../domain/factory/kit-option';
import { KitUnitDomainModelFactory } from '../../../domain/factory/kit-unit';
import { KitUnitModuleDomainModelFactory } from '../../../domain/factory/kit-unit-module';
import { SnowflakeClient } from '../../../external/snowflake/client';
import { SynchroniseCostingCronHandler } from './handler';

export type SnowflakeConnectionDetailsEvironmentMapping = {
  readonly SNOWFLAKE_ACCOUNT: string;
  readonly SNOWFLAKE_USERNAME: string;
  readonly SNOWFLAKE_PASSWORD: string;
  readonly SNOWFLAKE_WAREHOUSE: string;
  readonly SNOWFLAKE_ROLE: string;
};

/**
 * The environment variables required for this handler.
 */
export type HandlerEnvironmentMapping = (
  & RuntimeEnvironmentMapping
  & PostgresConnectionDetailsEnvironmentMapping
  & SnowflakeConnectionDetailsEvironmentMapping
);

/**
 * The lambda function "handler" entrypoint.
 */
export const handler = aws<'service:synchronise-costing'>(async (application, environment) => {
  const runtime = resolveRuntimeTypeFromEnvironment(environment);
  const database = await createDatabaseConnectionManager(date, runtime, environment);

  const snowflake = new SnowflakeClient({
    account: getEnvironmentVariable<SnowflakeConnectionDetailsEvironmentMapping>(environment, 'SNOWFLAKE_ACCOUNT'),
    username: getEnvironmentVariable<SnowflakeConnectionDetailsEvironmentMapping>(environment, 'SNOWFLAKE_USERNAME'),
    password: getEnvironmentVariable<SnowflakeConnectionDetailsEvironmentMapping>(environment, 'SNOWFLAKE_PASSWORD'),
    warehouse: getEnvironmentVariable<SnowflakeConnectionDetailsEvironmentMapping>(environment, 'SNOWFLAKE_WAREHOUSE'),
    role: getEnvironmentVariable<SnowflakeConnectionDetailsEvironmentMapping>(environment, 'SNOWFLAKE_ROLE'),
  });

  return application
    .handle(
      new SynchroniseCostingCronHandler(
        snowflake,
        new KitModuleDatabaseRepository(database),
        new KitUnitDatabaseRepository(database),
        new KitUnitModuleDatabaseRepository(database),
        new KitModuleElementReferenceDatabaseRepository(database),
        new KitModuleBillOfMaterialDatabaseRepository(database),
        new KitBaseBuildElementReferenceDatabaseRepository(database),
        new KitOptionDatabaseRepository(database),
        new KitModuleElementCategoryDatabaseRepository(database),
        new KitModuleDomainModelFactory(identity, date),
        new KitUnitDomainModelFactory(identity, date),
        new KitUnitModuleDomainModelFactory(identity, date),
        new KitModuleElementReferenceDomainModelFactory(identity, date),
        new KitModuleBillOfMaterialDomainModelFactory(identity, date),
        new KitBaseBuildElementReferenceDomainModelFactory(identity, date),
        new KitOptionDomainModelFactory(identity, date),
        new KitModuleElementCategoryDomainModelFactory(identity, date),
      ),
    );
});
