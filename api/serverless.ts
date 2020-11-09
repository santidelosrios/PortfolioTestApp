import type { Serverless } from 'serverless/aws';

const serverlessConfiguration: Serverless = {
  service: {
    name: 'portfolio-app',
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
  plugins: ['serverless-webpack', 'serverless-offline', 'serverless-dotenv-plugin'],
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
        Action: ['dynamodb:DescribeTable', 'dynamodb:Query', 'dynamodb:Scan', 'dynamodb:GetItem', 'dynamodb:PutItem', 'dynamodb:UpdateItem'],
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
    },
  },
  functions: {
    'getUserPortfolio': {
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
    'updateUserPortfolio': {
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
    'createUserPortfolio': {
      handler: 'src/user-portfolio/userPortfolio.create',
      events: [
        {
          http: {
            method: 'post',
            path: 'user-portfolio',
            cors: true,
          }
        }
      ]
    },
  },
};

module.exports = serverlessConfiguration;
