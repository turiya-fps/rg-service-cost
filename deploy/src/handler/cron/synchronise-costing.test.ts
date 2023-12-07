import type { LambdaLayerVersion } from '@cdktf/provider-aws/lib/lambda-layer-version';
import { AwsProvider } from '@cdktf/provider-aws/lib/provider';
import type { S3Object } from '@cdktf/provider-aws/lib/s3-object';
import { partial } from '@matt-usurp/grok/testing';
import type { AccountWithProvider } from '@project-rouge/infrastructure-core/aws/account';
import { TerraformStack, Testing } from 'cdktf';
import * as fs from 'fs/promises';
import path from 'path';
import { SynchroniseCostingCronHandlerDefinition } from './synchronise-costing';

const DIR_ROOT = path.resolve(__dirname, '..', '..', '..', '..');

describe(SynchroniseCostingCronHandlerDefinition.name, (): void => {
  it('with handler function, entrypoint file exists in project', async (): Promise<void> => {
    const app = Testing.app();
    const stack = new TerraformStack(app, 'testing');

    const provider = new AwsProvider(stack, 'provider-aws');

    const code = partial<S3Object>({});
    const vendor = partial<LambdaLayerVersion>({});

    const definition = new SynchroniseCostingCronHandlerDefinition(stack, {
      providers: {
        environment: partial<AccountWithProvider>({
          provider,
        }),
      },

      stack: 'some-stack',

      source: {
        code,
        vendor,
      },

      database: {
        database: 'test:database:database',

        credential: {
          purpose: 'read',
          hostname: 'test:database:credential:hostname',
          username: 'test:database:credential:username',
          policy: 'test:database:credential:policy',
        },
      },

      external: {
        snowflake: {
          account: 'test:external:snowflake:account',
          username: 'test:external:snowflake:username',
          password: 'test:external:snowflake:password',
          warehouse: 'test:external:snowflake:warehouse',
          role: 'test:external:snowflake:role',
        },
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const handler = definition.handler.function.handlerInput!;

    const entrypoint = `${handler.substring(0, handler.length - 8)}.ts`;
    const composed = path.resolve(DIR_ROOT, 'service', 'src', entrypoint);

    await fs.readFile(composed);
  });
});
