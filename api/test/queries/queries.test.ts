import { getTweets, getUserPortfolio } from '../../queries/queries'
import aws from 'aws-sdk'

const config = {
  convertEmptyValues: true,
  endpoint: 'localhost:8000',
  sslEnabled: false,
  region: 'local'
};

const ddb = new aws.DynamoDB.DocumentClient(config);

describe('Test queries functions', () => {
  test('test getTweets. Expect array with tweets', () => {
    const expected = [
      {
        tweetTitle: 'Title 1',
        tweetText: 'Text 1',
        tweetImg: 'image'
      },
      {
        tweetTitle: 'Title 1',
        tweetText: 'Text 2',
        tweetImg: 'image'
      },
      {
        tweetTitle: 'Title 1',
        tweetText: 'Text 3',
        tweetImg: 'image'
      },
      {
        tweetTitle: 'Title 1',
        tweetText: 'Text 4',
        tweetImg: 'image'
      },
      {
        tweetTitle: 'Title 1',
        tweetText: 'Text 5',
        tweetImg: 'image'
      },
    ]

    expect.assertions(1)
    return getTweets('test1', 'Title 1').then(data => expect(data).toEqual(expected))
  })
  test('test getTweets. Expect fail in request', () => {
    return getTweets('test2', 'title 1').catch(err => expect(err).toBe('Something went wrong'))
  })
  //NOTE: There was a problem with the mocking of DynamoDB that I could not solve, leaving one of the tests to show how it would be done.
  // test('test getUserPortfolio, Expect item', async () => {
  //   await ddb.put({TableName: 'user-portfolios', Item: {
  //     id: '1',
  //     firstName: 'Mickey',
  //     lastName: 'Mouse',
  //     description: 'I am Mickey Mouse',
  //     imageUrl: 'image',
  //     twitterUserName: 'test1',
  //     title: 'Title 1'
  //   }})

  //   const expected = {
  //     imageUrl: 'image',
  //     twitterUserName: 'test1',
  //     lastName: 'Mouse',
  //     description: 'I am Mickey Mouse',
  //     id: '1',
  //     firstName: 'Mickey',
  //     title: 'Title 1',
  //     portfolioTweets: [
  //       {
  //         tweetTitle: 'Title 1',
  //         tweetText: 'Text 1',
  //         tweetImg: 'image'
  //       },
  //       {
  //         tweetTitle: 'Title 1',
  //         tweetText: 'Text 2',
  //         tweetImg: 'image'
  //       },
  //       {
  //         tweetTitle: 'Title 1',
  //         tweetText: 'Text 3',
  //         tweetImg: 'image'
  //       },
  //       {
  //         tweetTitle: 'Title 1',
  //         tweetText: 'Text 4',
  //         tweetImg: 'image'
  //       },
  //       {
  //         tweetTitle: 'Title 1',
  //         tweetText: 'Text 5',
  //         tweetImg: 'image'
  //       },
  //     ]
  //   }

  //   expect.assertions(1)
  //   return getUserPortfolio('1').then(data => { 
  //     //expect(data).toEqual(expected)
  //   })
  // })
})