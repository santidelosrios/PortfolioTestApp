module.exports = {
  tables: [
    {
      TableName: 'user-portfolios',
      KeySchema: [{AttributeName: 'id', KeyType: 'HASH'}],
      AttributeDefinitions: [{AttributeName: 'id', AttributeType: 'S'}],
      ProvisionedThroughput: {ReadCapacityUnits: 1, WriteCapacityUnits: 1},
    },
    // etc
  ],
  port: 8000
};