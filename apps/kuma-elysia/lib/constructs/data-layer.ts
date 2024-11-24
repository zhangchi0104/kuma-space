import * as s3 from 'aws-cdk-lib/aws-s3';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';
import { CfnOutput, RemovalPolicy } from 'aws-cdk-lib';
import { IGrantable } from 'aws-cdk-lib/aws-iam';

export class DataLayer extends Construct {
  public readonly contentBucket: s3.Bucket;
  public readonly assetsBucket: s3.Bucket;
  public readonly metadataTable: dynamodb.TableV2;
  constructor(scope: Construct, id: string) {
    super(scope, id);
    // The code that defines your stack goes here
    this.contentBucket = new s3.Bucket(this, 'BlogContentBucket', {
      bucketName: `alexz-blog-content-${this.envName}-${
        process.env.CDK_REGION || 'ap-southeast-2'
      }`,
    });
    this.assetsBucket = new s3.Bucket(this, 'BlogAssetsBucket', {
      bucketName: `alexz-blog-assets-${this.envName}-${
        process.env.CDK_REGION || 'ap-southeast-2'
      }`,
      publicReadAccess: true,
      blockPublicAccess: {
        blockPublicAcls: false,
        blockPublicPolicy: false,
        ignorePublicAcls: false,
        restrictPublicBuckets: false,
      },
    });

    this.metadataTable = new dynamodb.TableV2(this, 'BlogMetadataTable', {
      tableName: `BlogMetadata-${this.envName}`,
      partitionKey: {
        name: 'PostId',
        type: dynamodb.AttributeType.STRING,
      },
      sortKey: {
        name: 'LanguageCode',
        type: dynamodb.AttributeType.STRING,
      },

      globalSecondaryIndexes: [
        {
          indexName: 'LanguageCodeIndex',
          partitionKey: {
            name: 'LanguageCode',
            type: dynamodb.AttributeType.STRING,
          },
          sortKey: {
            name: 'CreatedAtUtc',
            type: dynamodb.AttributeType.STRING,
          },
        },
      ],
    });

    new CfnOutput(this, 'ContentBucketOutput', {
      key: 'ContentBucketName',
      value: this.contentBucket.bucketName,
    });
    new CfnOutput(this, 'AssetsBucketOutput', {
      key: 'AssetsBucketName',
      value: this.assetsBucket.bucketName,
    });
    new CfnOutput(this, 'MetadataTableOutput', {
      key: 'MetadataTableName',
      value: this.metadataTable.tableName,
    });
  }

  private get envName() {
    return process.env.NODE_ENV && process.env.NODE_ENV === 'production'
      ? 'prod'
      : 'dev';
  }

  public grantReadWrite(role: IGrantable) {
    this.contentBucket.grantReadWrite(role);
    this.assetsBucket.grantReadWrite(role);
    this.metadataTable.grantReadWriteData(role);
  }
}
