import type { Handler, Response } from '@phasma/handler-aws';
import { nothing } from '@phasma/handler-aws/response';
import type { KitBaseBuildElementReferenceDatabaseRepository } from '../../../database/repository/kit-base-build-element-reference';
import type { KitModuleDatabaseRepository } from '../../../database/repository/kit-module';
import type { KitModuleBillOfMaterialDatabaseRepository } from '../../../database/repository/kit-module-bill-of-material';
import type { KitModuleElementCategoryDatabaseRepository } from '../../../database/repository/kit-module-element-category';
import type { KitModuleElementReferenceDatabaseRepository } from '../../../database/repository/kit-module-element-reference';
import type { KitOptionDatabaseRepository } from '../../../database/repository/kit-option';
import type { KitUnitDatabaseRepository } from '../../../database/repository/kit-unit';
import type { KitUnitModuleDatabaseRepository } from '../../../database/repository/kit-unit-module';
import type { KitBaseBuildElementReferenceDomainModelFactory } from '../../../domain/factory/kit-base-build-element-reference';
import type { KitModuleDomainModelFactory } from '../../../domain/factory/kit-module';
import type { KitModuleBillOfMaterialDomainModelFactory } from '../../../domain/factory/kit-module-bill-of-material';
import type { KitModuleElementCategoryDomainModelFactory } from '../../../domain/factory/kit-module-element-category';
import type { KitModuleElementReferenceDomainModelFactory } from '../../../domain/factory/kit-module-element-reference';
import type { KitOptionDomainModelFactory } from '../../../domain/factory/kit-option';
import type { KitUnitDomainModelFactory } from '../../../domain/factory/kit-unit';
import type { KitUnitModuleDomainModelFactory } from '../../../domain/factory/kit-unit-module';
import type { SnowflakeClient } from '../../../external/snowflake/client';
import { synchroniseBaseBuildElementReferenceFeedItems, synchroniseModularElementCategoryItems, synchroniseModuleBillOfMaterialFeedItems, synchroniseModuleElementReferenceFeedItems, synchroniseModuleFeedItems, synchroniseOptionFeedItems, synchroniseUnitFeedItems, synchroniseUnitModuleFeedItems } from '../../../external/snowflake/synchroniser';

type Definition = Handler.Definition<'service:synchronise-costing', Handler.Context, Response.Nothing>;

export class SynchroniseCostingCronHandler implements Handler.Implementation<Definition> {
  public constructor(
    private readonly snowflake: SnowflakeClient,
    private readonly kitModuleDatabaseRepository: KitModuleDatabaseRepository,
    private readonly kitUnitDatabaseRepository: KitUnitDatabaseRepository,
    private readonly kitUnitModuleDatabaseRepository: KitUnitModuleDatabaseRepository,
    private readonly kitModuleElementReferenceDatabaseRepository: KitModuleElementReferenceDatabaseRepository,
    private readonly kitModuleBillOfMaterialDatabaseRepository: KitModuleBillOfMaterialDatabaseRepository,
    private readonly kitBaseBuildElementReferenceDatabaseRepository: KitBaseBuildElementReferenceDatabaseRepository,
    private readonly kitOptionDatabaseRepository: KitOptionDatabaseRepository,
    private readonly kitModuleElementCategoryDatabaseRepository: KitModuleElementCategoryDatabaseRepository,
    private readonly kitModuleDomainModelFactory: KitModuleDomainModelFactory,
    private readonly kitUnitDomainModelFactory: KitUnitDomainModelFactory,
    private readonly kitUnitModuleDomainModelFactory: KitUnitModuleDomainModelFactory,
    private readonly kitModuleElementReferenceDomainModelFactory: KitModuleElementReferenceDomainModelFactory,
    private readonly kitModuleBillOfMaterialDomainModelFactory: KitModuleBillOfMaterialDomainModelFactory,
    private readonly kitBaseBuildElementReferenceDomainModelFactory: KitBaseBuildElementReferenceDomainModelFactory,
    private readonly kitOptionDomainModelFactory: KitOptionDomainModelFactory,
    private readonly kitModuleElementCategoryDomainModelFactory: KitModuleElementCategoryDomainModelFactory,
  ) {}

  /**
   * @inheritdoc
   */
  public async handle({}: Handler.Fn.Input<Definition>): Handler.Fn.Output<Definition> {
    await this.snowflake.connect();

    // eslint-disable-next-line no-console
    console.log({ target: 'modules' });
    const modules = await synchroniseModuleFeedItems(this.snowflake, this.kitModuleDatabaseRepository, this.kitModuleDomainModelFactory);

    // eslint-disable-next-line no-console
    console.log({ target: 'units' });
    const units = await synchroniseUnitFeedItems(this.snowflake, this.kitUnitDatabaseRepository, this.kitUnitDomainModelFactory);

    // eslint-disable-next-line no-console
    console.log({ target: 'unit module relationships' });
    await synchroniseUnitModuleFeedItems(this.snowflake, this.kitUnitModuleDatabaseRepository, this.kitUnitModuleDomainModelFactory, {
      units,
      modules,
    });

    // eslint-disable-next-line no-console
    console.log({ target: 'module element reference' });
    const moduleElementReferences = await synchroniseModuleElementReferenceFeedItems(this.snowflake, this.kitModuleElementReferenceDatabaseRepository, this.kitModuleElementReferenceDomainModelFactory);

    // eslint-disable-next-line no-console
    console.log({ target: 'module bill of materials' });
    await synchroniseModuleBillOfMaterialFeedItems(this.snowflake, this.kitModuleBillOfMaterialDatabaseRepository, this.kitModuleBillOfMaterialDomainModelFactory, {
      modules,
      moduleElementReferences,
    });

    // eslint-disable-next-line no-console
    console.log({ target: 'base build element references' });
    await synchroniseBaseBuildElementReferenceFeedItems(this.snowflake, this.kitBaseBuildElementReferenceDatabaseRepository, this.kitBaseBuildElementReferenceDomainModelFactory);

    // eslint-disable-next-line no-console
    console.log({ target: 'option groups and values' });
    await synchroniseOptionFeedItems(this.snowflake, this.kitOptionDatabaseRepository, this.kitOptionDomainModelFactory);

    // eslint-disable-next-line no-console
    console.log({ target: 'module element categories' });
    await synchroniseModularElementCategoryItems(this.snowflake, this.kitModuleElementCategoryDatabaseRepository, this.kitModuleElementCategoryDomainModelFactory);
    return nothing();
  }
}
