import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as elbv2 from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import { CfnOutput } from 'aws-cdk-lib';
import * as route53Targets from 'aws-cdk-lib/aws-route53-targets';
import * as autoscaling from 'aws-cdk-lib/aws-autoscaling';
import * as ecsp from 'aws-cdk-lib/aws-ecs-patterns';
import { Construct } from 'constructs';

import { ServerProps } from '../types/ServerEnvironmentVariables';
import path from 'path';
import { Platform } from 'aws-cdk-lib/aws-ecr-assets';
import { Duration } from 'aws-cdk-lib';
import { ApplicationProtocol } from 'aws-cdk-lib/aws-elasticloadbalancingv2';

type EcsServiceStackProps = ServerProps & {
  vpc: ec2.IVpc;
  hostedZone: route53.IHostedZone;
};
type BlogServiceTaskDefinitionProps = {
  taskDefinitionName: string;
  containerName: string;
  containerImage: ecs.ContainerImage;
  env: ServerProps['env'];
};

interface EcsClusterProps {
  vpc: ec2.IVpc;
  securityGroup: ec2.ISecurityGroup;
}
export class EcsServiceStack extends Construct {
  public readonly ecsService:
    | ecs.BaseService
    | ecsp.ApplicationLoadBalancedEc2Service;
  constructor(scope: Construct, id: string, props: EcsServiceStackProps) {
    const { env, vpc, hostedZone } = props;
    super(scope, id);
    const certificate = acm.Certificate.fromCertificateArn(
      this,
      'DomainCertificate',
      process.env.CERTIFICATE_ARN || '',
    );
    const conatinerImage = ecs.ContainerImage.fromAsset(
      path.join(__dirname, '../../'),
      {
        platform: Platform.LINUX_AMD64,
      },
    );
    const securityGroup = this.createSecurityGroup({ vpc });
    const ecsCluster = this.createCluster({ vpc, securityGroup });
    const taskDefinition = this.createTaskDefinition({
      taskDefinitionName: 'BlogServerTask',
      containerName: 'BlogServerContainer',
      env: env,
      containerImage: conatinerImage,
    });

    const service = new ecs.Ec2Service(this, 'BlogService', {
      cluster: ecsCluster,
      taskDefinition,
    });
    const target = service.loadBalancerTarget({
      containerName: 'BlogServerContainer',
      containerPort: 8000,
    });
    const loadBalancer = new elbv2.ApplicationLoadBalancer(
      this,
      'BlogLoadBalancer',
      {
        vpc,
        internetFacing: true,
        securityGroup: securityGroup,
      },
    );

    const listener = loadBalancer.addListener('HttpsListener', {
      protocol: elbv2.ApplicationProtocol.HTTPS,
      certificates: [certificate],
    });

    listener.addTargets('BlogTargetGroup', {
      port: 8000,
      targets: [target],
      healthCheck: {
        path: '/health',
      },
    });
    this.ecsService = service;
    new route53.ARecord(this, 'BlogARecord', {
      zone: hostedZone,
      target: route53.RecordTarget.fromAlias(
        new route53Targets.LoadBalancerTarget(loadBalancer),
      ),
      recordName: 'prod',
    });

    new CfnOutput(this, 'LoadBalancerDNS', {
      value: loadBalancer.loadBalancerDnsName,
    });
  }

  private createTaskDefinition(props: BlogServiceTaskDefinitionProps) {
    const logging = new ecs.AwsLogDriver({ streamPrefix: 'blog-prod' });
    const taskDefinition = new ecs.TaskDefinition(
      this,
      'BlogBackendTaskDefinition',
      {
        family: props.taskDefinitionName,
        compatibility: ecs.Compatibility.EC2,
        cpu: '256',
        memoryMiB: '400',
        networkMode: ecs.NetworkMode.BRIDGE,
      },
    );
    taskDefinition.addContainer(props.containerName, {
      image: props.containerImage,
      containerName: props.containerName,
      portMappings: [
        {
          containerPort: this.containerPort,
          hostPort: this.hostPort,
          protocol: ecs.Protocol.TCP,
          name: 'nest-port',
        },
      ],

      environment: { ...props.env },
      logging: logging,
      startTimeout: Duration.minutes(2),
      cpu: 256,
      memoryLimitMiB: 400,
    });
    return taskDefinition;
  }

  private createCluster(props: EcsClusterProps) {
    const { vpc } = props;
    const ecsCluster = new ecs.Cluster(this, 'BlogCluster', {
      vpc,
    });
    const asg = new autoscaling.AutoScalingGroup(this, 'ASG', {
      vpc,
      instanceType: new ec2.InstanceType('t2.micro'),
      machineImage: ecs.EcsOptimizedImage.amazonLinux2023(),
      minCapacity: 1,
      maxCapacity: 1,
      securityGroup: props.securityGroup,
    });
    const capacityProvider = new ecs.AsgCapacityProvider(
      this,
      'CapacityProvider',
      {
        autoScalingGroup: asg,
      },
    );
    ecsCluster.addAsgCapacityProvider(capacityProvider);
    return ecsCluster;
  }
  private createSecurityGroup(props: { vpc: ec2.IVpc }) {
    const { vpc } = props;
    const securityGroup = new ec2.SecurityGroup(this, 'BlogSecurityGroup', {
      vpc,
    });
    // Allow any one to connect port 443
    // Allow anyone to connect port 8000
    securityGroup.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(443),
      'Allow HTTPS traffic from anywhere IPv4',
    );
    securityGroup.addIngressRule(
      ec2.Peer.anyIpv6(),
      ec2.Port.tcp(443),
      'Allow HTTPS traffic from anywhere IPv4',
    );
    securityGroup.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(8000),
      'Allow HTTPS traffic from anywhere IPv4',
    );
    securityGroup.addIngressRule(
      ec2.Peer.anyIpv6(),
      ec2.Port.tcp(8000),
      'Allow HTTPS traffic from anywhere IPv4',
    );
    return securityGroup;
  }

  private get containerPort() {
    return 8000;
  }

  private get hostPort() {
    return 8000;
  }
}
