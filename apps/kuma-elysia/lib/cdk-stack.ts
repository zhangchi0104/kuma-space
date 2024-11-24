import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { DataLayer } from './constructs/data-layer';
import { LambdaStack } from './constructs/lambda-stack';
import { EcsServiceStack } from './constructs/ecs-service-stack';

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const storageStack = new DataLayer(this, 'DataLayer');
    const env = {
      JWT_PUBLIC_KEY: 'No longer needed',
      BLOG_ASSETS_BUCKET: storageStack.assetsBucket.bucketName,
      BLOG_CONTENT_BUCKET: storageStack.contentBucket.bucketName,
      BLOG_METADATA_TABLE: storageStack.metadataTable.tableName,
      DATABASE_DIRECT_URL: process.env.DATABASE_DIRECT_URL || '',
      DATABASE_TRANSACTION_URL: process.env.DATABASE_TRANSACTION_URL || '',
    };
    const hostedZone = cdk.aws_route53.HostedZone.fromLookup(
      this,
      'HostedZone',
      {
        domainName: 'api.chiz.dev',
      },
    );
    const vpc = cdk.aws_ec2.Vpc.fromLookup(this, 'Vpc', {
      isDefault: true,
    });
    if (this.envName === 'dev') {
      // save me a few bucks by using lambda for dev
      const lambdaStack = new LambdaStack(this, 'LambdaStack', {
        hostedZone,
        env,
      });
      storageStack.grantReadWrite(lambdaStack.lambda);
    } else {
      const ecsStack = new EcsServiceStack(this, 'EcsServiceStack', {
        hostedZone,
        vpc,
        env,
      });
      storageStack.grantReadWrite(ecsStack.ecsService.taskDefinition.taskRole);
    }
    this.applyTags();
  }

  private applyTags() {
    const tags = [
      { key: 'Environment', value: this.envName },
      { key: 'ResourceGroup', value: 'blog' },
      { key: 'Owner', value: this.stackName },
    ];
    tags.forEach((tag) => {
      cdk.Tags.of(this).add(tag.key, tag.value, {
        excludeResourceTypes: [
          'AWS::Route53::HostedZone',
          'AWS::CertificateManager::Certificate',
        ],
      });
    });
  }
  private get envName() {
    return process.env.NODE_ENV && process.env.NODE_ENV === 'production'
      ? 'prod'
      : 'dev';
  }
}
