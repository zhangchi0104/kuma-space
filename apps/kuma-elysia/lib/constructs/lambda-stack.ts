import { CfnOutput, Duration } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as apigw from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as route53Targets from 'aws-cdk-lib/aws-route53-targets';

import { ServerProps } from '../types/ServerEnvironmentVariables';
import path from 'path';
import { Platform } from 'aws-cdk-lib/aws-ecr-assets';
type LambdaStackProps = ServerProps & {
  hostedZone: route53.IHostedZone;
};
export class LambdaStack extends Construct {
  public readonly lambda: lambda.Function;
  constructor(scope: Construct, id: string, props: LambdaStackProps) {
    const { env, hostedZone } = props;
    super(scope, id);
    const lambdaFunction = new lambda.DockerImageFunction(this, 'BlogLambda', {
      code: lambda.DockerImageCode.fromImageAsset(
        path.join(__dirname, '../../'),
        {
          file: 'Dockerfile.lambda',
          platform: Platform.LINUX_AMD64,
        },
      ),
      functionName: `BlogLambda-${this.envName}`,
      environment: {
        ...env,
        LAZY_DB_CONNECT: 'true',
      },
      timeout: Duration.seconds(30),
    });
    this.lambda = lambdaFunction;
    const certificate = acm.Certificate.fromCertificateArn(
      this,
      'DomainCertificate',
      process.env.CERTIFICATE_ARN || '',
    );

    const apiGateway = new apigw.LambdaRestApi(this, 'BlogApiGateway', {
      restApiName: `BlogApiGateway-${this.envName}`,
      handler: lambdaFunction,
      proxy: true,
      domainName: {
        domainName: `${this.envName}.api.chiz.dev`,
        certificate: certificate,
        endpointType: apigw.EndpointType.REGIONAL,
      },
      deploy: true,
      deployOptions: {
        stageName: this.envName,
      },
    });
    new route53.ARecord(this, 'ApiGatewayAliasRecord', {
      zone: hostedZone,
      recordName: `${this.envName}`,
      target: route53.RecordTarget.fromAlias(
        new route53Targets.ApiGateway(apiGateway),
      ),
    });

    new CfnOutput(this, 'ApiGatewayCustomUrlOutput', {
      key: 'ApiGatewayCustomUrl',
      value: apiGateway.domainName?.domainName || 'unknown',
    });
    new CfnOutput(this, 'ApiGatewayUrlOutput', {
      key: 'ApiGatewayUrl',
      value: apiGateway.url,
    });
    new CfnOutput(this, 'ApiGatewayArnOutput', {
      key: 'ApiGatewayArn',
      value: apiGateway.restApiRootResourceId,
    });
  }

  private get envName() {
    return process.env.NODE_ENV && process.env.NODE_ENV === 'production'
      ? 'prod'
      : 'dev';
  }
}
