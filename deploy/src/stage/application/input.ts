import { DataAwsApigatewayv2Api } from '@cdktf/provider-aws/lib/data-aws-apigatewayv2-api';
import { DataAwsS3Bucket } from '@cdktf/provider-aws/lib/data-aws-s3-bucket';
import type { PostgresCredentialInputMapping, PostgresCredentialPurpose, PostgresCredentialSecretMapping } from '@project-rouge/infrastructure-core/database/postgres/credential';
import { AccountInputLookup } from '@project-rouge/infrastructure-core/stack/input';
import { jsondecode } from '@project-rouge/infrastructure-core/terraform';
import type { Construct } from 'constructs';
import type { ApplicationStageProviders } from './provider';

export type SnowflakeCredentialSecretMapping = {
  readonly account: string;
  readonly username: string;
  readonly password: string;
  readonly warehouse: string;
  readonly role: string;
};

export type ApplicationStageInputMapping = {
  readonly api: DataAwsApigatewayv2Api;

  readonly storage: {
    readonly code: DataAwsS3Bucket;
  };

  readonly database: {
    readonly aurora: {
      readonly database: string;

      readonly read: PostgresCredentialInputMapping;
      readonly write: PostgresCredentialInputMapping;
    };
  };

  readonly external: {
    readonly snowflake: SnowflakeCredentialSecretMapping;
  };
};

type CredentialsProps = {
  readonly purpose: PostgresCredentialPurpose;

  readonly service: {
    readonly alias: string;
  };
};

const resolvePostgresCredential = (factory: AccountInputLookup, props: CredentialsProps): PostgresCredentialInputMapping => {
  const arn = factory.parameter(
    `input-database-aurora-shared-connection-${props.purpose}-arn`,
    `/rg/database/aurora-shared/connection/service/${props.service.alias}/credential/${props.purpose}/arn`,
  );

  const credential = factory.secret(
    `input-database-aurora-shared-connection-${props.purpose}-arn-secret`,
    arn.value,
  );

  const json = jsondecode<PostgresCredentialSecretMapping>(credential.secretString);

  return {
    purpose: props.purpose,
    username: json('username'),

    hostname: factory.parameter(
      `input-database-aurora-shared-connection-${props.purpose}-endpoint`,
      `/rg/database/aurora-shared/endpoint/${props.purpose}`,
    ).value,

    policy: factory.parameter(
      `input-database-aurora-shared-connection-${props.purpose}-policy-arn`,
      `/rg/database/aurora-shared/connection/service/${props.service.alias}/credential/${props.purpose}/policy/arn`,
    ).value,
  };
};

const resolveSnowflakeCredential = (factory: AccountInputLookup): SnowflakeCredentialSecretMapping => {
  const credential = factory.secret(
    'input-external-snowflake-costing-credential',
    '/rg/external/snowflake/costing/credential',
  );

  const json = jsondecode<SnowflakeCredentialSecretMapping>(credential.secretString);

  return {
    account: json('account'),
    username: json('username'),
    password: json('password'),
    warehouse: json('warehouse'),
    role: json('role'),
  };
};

export const resolveApplicationStageInputs = (scope: Construct, providers: ApplicationStageProviders): ApplicationStageInputMapping => {
  const environment = new AccountInputLookup(scope, providers.environment);

  return {
    api: new DataAwsApigatewayv2Api(scope, 'input-service-cost-api', {
      provider: environment.account.provider,

      apiId: environment.parameter(
        'input-service-cost-api-id',
        '/rg/service/cost/api/id',
      ).value,
    }),

    storage: {
      code: new DataAwsS3Bucket(scope, 'input-storage-code-bucket', {
        provider: environment.account.provider,

        bucket: environment.parameter(
          'input-storage-code-bucket-name',
          '/rg/storage/code/bucket/name',
        ).value,
      }),
    },

    database: {
      aurora: {
        database: environment.parameter(
          'input-database-aurora-shared-database',
          '/rg/database/aurora-shared/database',
        ).value,

        read: resolvePostgresCredential(environment, {
          purpose: 'read',

          service: {
            alias: 'cost',
          },
        }),

        write: resolvePostgresCredential(environment, {
          purpose: 'write',

          service: {
            alias: 'cost',
          },
        }),
      },
    },

    external: {
      snowflake: resolveSnowflakeCredential(environment),
    },
  };
};
