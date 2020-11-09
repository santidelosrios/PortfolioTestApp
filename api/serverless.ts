import type { Serverless } from 'serverless/aws';

const serverlessConfiguration: Serverless = {
  service: {
    name: 'portfolio-app',
    // app and org for use with dashboard.serverless.com
    // app: your-app-name,
    // org: your-org-name,
  },
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
    dynamodb: {
      stages: ['test'],
      start: {
        inMemory: true,
        migrate: true
      }
    }
  },
  // Add the serverless-webpack plugin
  plugins: ['serverless-webpack', 'serverless-offline', 'serverless-dynamodb-local'],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    region: 'us-east-2',
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      DEBUG: '*',
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: ['xray:PutTraceSegments', 'xray:PutTelemetryRecords'],
        Resource: '*'
      },
      {
        Effect: 'Allow',
        Action: ['dynamodb:DescribeTable', 'dynamodb:Query', 'dynamodb:Scan', 'dynamodb:GetItem', 'dynamodb:PutItem'],
        Resource: '*'
      }
    ]
  },
  resources: {
    Resources: {
      'DynamoDBTable': {
        Type: 'AWS::DynamoDB::Table',
        DeletionPolicy: 'Retain',
        Properties: {
          TableName: 'user-portfolios',
          AttributeDefinitions: [
            {
              AttributeName: 'id',
              AttributeType: 'S',
            },
          ],
          KeySchema: [ 
            {
              AttributeName: 'id',
              KeyType: 'HASH'
            },
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
          }
        },
      },
      // 'GatewayResponseDefault4XX': {
      //   Type: 'AWS::ApiGateway::GatewayResponse',
      //   Properties: {
      //     ResponseParameters: {
      //       'gatewayresponse.header.Access-Control-Allow-Origin': "'*'",
      //       'gatewayresponse.header.Access-Control-Allow-Headers': "'*'"
      //     },
      //     ResponseType: 'DEFAULT_4XX',
      //     RestApiId: {
      //       'Ref': 'ApiGatewayRestApi'
      //     }
      //   }
      // }
    },
  },
  functions: {
    'getUserPorfolio': {
      handler: 'src/user-portfolio/userPortfolio.get',
      events: [
        {
          http: {
            method: 'get',
            path: 'user-portfolio/{id}',
            cors: true,
          }
        },
      ]
    },
    'updateUserPorfoltio': {
      handler: 'src/user-portfolio/userPortfolio.update',
      events: [
        {
          http: {
            method: 'put',
            path: 'user-portfolio/{id}',
            cors: true,
          }
        }
      ]
    },
  },
};

module.exports = serverlessConfiguration;
