import { date } from '@project-rouge/service-core/data/date';
import { identity } from '@project-rouge/service-core/data/identity';
import { resolveProcessEnvironmentMapping } from '@project-rouge/service-core/environment/resolve';
import { resolveRuntimeTypeFromEnvironment } from '@project-rouge/service-core/environment/runtime';
import path from 'path';
import { createDatabaseConnectionManager } from '../../database/connection';
import { KitBaseBuildElementReferenceDatabaseRepository } from '../../database/repository/kit-base-build-element-reference';
import { KitModuleDatabaseRepository } from '../../database/repository/kit-module';
import { KitModuleBillOfMaterialDatabaseRepository } from '../../database/repository/kit-module-bill-of-material';
import { KitModuleElementCategoryDatabaseRepository } from '../../database/repository/kit-module-element-category';
import { KitModuleElementReferenceDatabaseRepository } from '../../database/repository/kit-module-element-reference';
import { KitOptionDatabaseRepository } from '../../database/repository/kit-option';
import { KitUnitDatabaseRepository } from '../../database/repository/kit-unit';
import { KitUnitModuleDatabaseRepository } from '../../database/repository/kit-unit-module';
import { KitBaseBuildElementReferenceDomainModelFactory } from '../../domain/factory/kit-base-build-element-reference';
import { KitModuleDomainModelFactory } from '../../domain/factory/kit-module';
import { KitModuleBillOfMaterialDomainModelFactory } from '../../domain/factory/kit-module-bill-of-material';
import { KitModuleElementCategoryDomainModelFactory } from '../../domain/factory/kit-module-element-category';
import { KitModuleElementReferenceDomainModelFactory } from '../../domain/factory/kit-module-element-reference';
import { KitOptionDomainModelFactory } from '../../domain/factory/kit-option';
import { KitUnitDomainModelFactory } from '../../domain/factory/kit-unit';
import { KitUnitModuleDomainModelFactory } from '../../domain/factory/kit-unit-module';
import { SynchroniseCostingCronHandler } from '../../handler/cron/synchronise-costing/handler';
import { SnowflakeClient } from './client';

const main = async (): Promise<void> => {
  // eslint-disable-next-line no-console
  console.log('[cli] connecting to database ..');

  const envfile = path.resolve(__dirname, '..', '..', '..', '.env');
  const environment = resolveProcessEnvironmentMapping(envfile);
  const runtime = resolveRuntimeTypeFromEnvironment(environment);

  const database = await createDatabaseConnectionManager(date, runtime, environment);

  if (process.env.SNOWFLAKE_PASSWORD === undefined) {
    // eslint-disable-next-line no-console
    console.error('[snowflake] missing password!');
    return;
  }

  const client = new SnowflakeClient({
    account: 'jj69775.eu-west-2.aws',
    username: 'costing_service',
    password: process.env.SNOWFLAKE_PASSWORD as string,
    warehouse: 'DATABRAIN_USE_COSTING',
    role: 'COSTING_ROLE_READ',
  });

  // eslint-disable-next-line no-console
  console.log('[cli] connecting to snowflake ..');

  const kitModuleDatabaseRepository = new KitModuleDatabaseRepository(database);
  const kitModuleDomainModelFactory = new KitModuleDomainModelFactory(identity, date);

  const kitUnitDatabaseRepository = new KitUnitDatabaseRepository(database);
  const kitUnitDomainModelFactory = new KitUnitDomainModelFactory(identity, date);

  const kitUnitModuleDatabaseRepository = new KitUnitModuleDatabaseRepository(database);
  const kitUnitModuleDomainModelFactory = new KitUnitModuleDomainModelFactory(identity, date);

  const kitModuleElementReferenceDatabaseRepository = new KitModuleElementReferenceDatabaseRepository(database);
  const kitModuleElementReferenceDomainModelFactory = new KitModuleElementReferenceDomainModelFactory(identity, date);

  const kitModuleBillOfMaterialDatabaseRepository = new KitModuleBillOfMaterialDatabaseRepository(database);
  const kitModuleBillOfMaterialDomainModelFactory = new KitModuleBillOfMaterialDomainModelFactory(identity, date);

  const kitBaseBuildElementReferenceDatabaseRepository = new KitBaseBuildElementReferenceDatabaseRepository(database);
  const kitBaseBuildElementReferenceDomainModelFactory = new KitBaseBuildElementReferenceDomainModelFactory(identity, date);

  const kitOptionDatabaseRepository = new KitOptionDatabaseRepository(database);
  const kitOptionDomainModelFactory = new KitOptionDomainModelFactory(identity, date);

  const kitModuleElementCategoryDatabaseRepository = new KitModuleElementCategoryDatabaseRepository(database);
  const kitModuleElementCategoryDomainModelFactory = new KitModuleElementCategoryDomainModelFactory(identity, date);

  const handler = new SynchroniseCostingCronHandler(
    client,
    kitModuleDatabaseRepository,
    kitUnitDatabaseRepository,
    kitUnitModuleDatabaseRepository,
    kitModuleElementReferenceDatabaseRepository,
    kitModuleBillOfMaterialDatabaseRepository,
    kitBaseBuildElementReferenceDatabaseRepository,
    kitOptionDatabaseRepository,
    kitModuleElementCategoryDatabaseRepository,
    kitModuleDomainModelFactory,
    kitUnitDomainModelFactory,
    kitUnitModuleDomainModelFactory,
    kitModuleElementReferenceDomainModelFactory,
    kitModuleBillOfMaterialDomainModelFactory,
    kitBaseBuildElementReferenceDomainModelFactory,
    kitOptionDomainModelFactory,
    kitModuleElementCategoryDomainModelFactory,
  );

  await handler.handle({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    provider: {} as any,

    context: {
      id: 'cron',
    },
  });

  // eslint-disable-next-line no-console
  console.log('[cli] complete!');
};

main()
  // eslint-disable-next-line promise/always-return
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('[cli] exiting ..');
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error(error);
  });
