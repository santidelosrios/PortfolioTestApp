import aws from 'aws-sdk';
import { AttributeMap } from 'aws-sdk/clients/dynamodb';
import Twitter from 'twitter';
import dotenv from 'dotenv'
dotenv.config()

const dynamoDB = new aws.DynamoDB.DocumentClient();

const twClient = new Twitter({
  consumer_key: process.env.TW_CONSUMER_KEY,
  consumer_secret: process.env.TW_CONSUMER_SECRET,
  access_token_key: process.env.TW_ACCESS_TOKEN,
  access_token_secret: process.env.TW_ACCESS_TOKEN_SECRET,
});

export const getTweets = async (userName: string, userTitle: string): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    twClient.get('statuses/user_timeline', {'screen_name': userName, 'count': 5}, (err, tweets: any[], _response) => {
      if (err) {
        reject({
          err,
          source: 'getTweets'
        })
      } else {
        const userTweets = tweets.map(tweet => {
          return {
            tweetTitle: userTitle,
            tweetText: tweet.text,
            tweetImg: tweet.user.profile_image_url_https
          }
        })

        resolve(userTweets)
      }
    })
  })
}

export const getUserPortfolio = (id: string): Promise<any> => {
  const params = {
    TableName: 'user-portfolios',
    Key: {'id': id}
  }

  return dynamoDB
    .get(params)
    .promise()
    .then(res => res.Item)
    .catch(err => {
      return {
        err, 
        source: 'getUserPorfolio'
      }
    })
}

export const updateUserPortfolio = (id: string, userPorfolio: {firstName: string, lastName: string, description: string, imageUrl: string, title: string, twitterUserName: string}) => {
  const params = {
    TableName: 'user-portfolios',
    Key: {
      'id': id
    },
    UpdateExpression: 'set firstName=:fn, lastName=:ln, description=:d, imageUrl=:im, twitterUserName=:t, title=:ti',
    ExpressionAttributeValues: {
      ":fn": userPorfolio.firstName,
      ":ln": userPorfolio.lastName,
      ":d": userPorfolio.description,
      ":im": userPorfolio.imageUrl,
      ":t": userPorfolio.twitterUserName,
      ":ti": userPorfolio.title,
    }
  }

  return dynamoDB
    .update(params)
    .promise()
    .then(res => res)
    .catch(err => err)
}