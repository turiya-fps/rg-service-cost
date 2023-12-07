import { Apigatewayv2Deployment } from '@cdktf/provider-aws/lib/apigatewayv2-deployment';
import { LambdaLayerVersion } from '@cdktf/provider-aws/lib/lambda-layer-version';
import { S3Object } from '@cdktf/provider-aws/lib/s3-object';
import type { AccountWithPurpose } from '@project-rouge/infrastructure-core/aws/account';
import type { LambdaHandlerEnvironmentMapping } from '@project-rouge/infrastructure-core/stack/composition/lambda/lambda-handler';
import type { LambdaHandlerWithRoute } from '@project-rouge/infrastructure-core/stack/composition/lambda/lambda-handler-route';
import { Fn, TerraformStack } from 'cdktf';
import type { Construct } from 'constructs';
import path from 'path';
import { GetProjectCostingResourceApiHandlerDefinition } from '../../handler/api/project/get-project-costing-resource';
import { PatchProjectCostingResourceApiHandlerDefinition } from '../../handler/api/project/patch-project-costing-resource';
import { PostProjectCostingCalculationResourceApiHandlerDefinition } from '../../handler/api/project/post-project-costing-calculation-resource';
import { SynchroniseCostingCronHandlerDefinition } from '../../handler/cron/synchronise-costing';
import { StackBackend } from '../../stack/backend';
import type { StackVariableMapping } from '../../stack/variable';
import { resolveApplicationStageInputs } from './input';
import { resolveApplicationStageProviders } from './provider';

type Props = {
  readonly accounts: AccountWithPurpose[];
};

export class ApplicationStageStack extends TerraformStack {
  /**
   * @inheritdoc
   */
  public constructor(scope: Construct, vars: StackVariableMapping, props: Props) {
    super(scope, 'target');

    // --
    // -- Terraform Setup
    // --

    new StackBackend(this, vars);

    const providers = resolveApplicationStageProviders(this, vars, props.accounts);
    const inputs = resolveApplicationStageInputs(this, providers);

    // --
    // -- Code Artifact
    // --

    // The project root relative to the directory where the code is compiled.
    // Resolve this to the absolute location for the object files.
    const root = path.resolve(__dirname, '../../../..');

    const files = {
      workspace: `${root}/service/build/workspace/package.zip`,
      vendor: `${root}/service/build/workspace/vendor.zip`,
    };

    // eslint-disable-next-line no-console
    console.dir({
      message: 'object:files',
      files,
    }, { depth: null });

    const workspace = new S3Object(this, 'object-service-zip', {
      provider: providers.environment.provider,

      bucket: inputs.storage.code.bucket,
      key: `services/${vars.stack.alias}/service.zip`,

      source: files.workspace,
      sourceHash: Fn.filebase64sha256(files.workspace),
    });

    const vendor = new S3Object(this, 'object-vendor-zip', {
      provider: providers.environment.provider,

      bucket: inputs.storage.code.bucket,
      key: `services/${vars.stack.alias}/vendor.zip`,

      source: files.vendor,
      sourceHash: Fn.filebase64sha256(files.vendor),
    });

    // --
    // -- Lambda Layer
    // --

    const layer = new LambdaLayerVersion(this, 'lambda-layer-vendor', {
      provider: providers.environment.provider,
      layerName: `${vars.stack.alias}-vendor`,

      s3Bucket: vendor.bucket,
      s3Key: vendor.key,
      sourceCodeHash: Fn.filebase64sha256(files.vendor),

      compatibleArchitectures: [
        'x86_64',
        'arm64',
      ],

      compatibleRuntimes: [
        'nodejs16.x',
      ],

      skipDestroy: true,

      dependsOn: [
        workspace,
        vendor,
      ],
    });

    // --
    // -- Endpoints
    // --

    const endpoints: { readonly handler: LambdaHandlerWithRoute<LambdaHandlerEnvironmentMapping> }[] = [];

    endpoints.push(
      new GetProjectCostingResourceApiHandlerDefinition(this, {
        providers: {
          environment: providers.environment,
        },

        stack: vars.stack.alias,

        source: {
          code: workspace,
          vendor: layer,
        },

        gateway: inputs.api,

        database: {
          database: inputs.database.aurora.database,
          credential: inputs.database.aurora.read,
        },
      }),
      new PatchProjectCostingResourceApiHandlerDefinition(this, {
        providers: {
          environment: providers.environment,
        },

        stack: vars.stack.alias,

        source: {
          code: workspace,
          vendor: layer,
        },

        gateway: inputs.api,

        database: {
          database: inputs.database.aurora.database,
          credential: inputs.database.aurora.write,
        },
      }),
      new PostProjectCostingCalculationResourceApiHandlerDefinition(this, {
        providers: {
          environment: providers.environment,
        },

        stack: vars.stack.alias,

        source: {
          code: workspace,
          vendor: layer,
        },

        gateway: inputs.api,

        database: {
          database: inputs.database.aurora.database,
          credential: inputs.database.aurora.read,
        },
      }),
    );

    // --
    // -- Deployment
    // --

    new Apigatewayv2Deployment(this, 'deployment', {
      provider: providers.environment.provider,

      apiId: inputs.api.id,

      dependsOn: endpoints.map((x) => x.handler.route),
    });

    // --
    // -- Crons
    // --

    new SynchroniseCostingCronHandlerDefinition(this, {
      providers: {
        environment: providers.environment,
      },

      stack: vars.stack.alias,

      source: {
        code: workspace,
        vendor: layer,
      },

      database: {
        database: inputs.database.aurora.database,
        credential: inputs.database.aurora.write,
      },

      external: {
        snowflake: inputs.external.snowflake,
      },
    });
  }
}
