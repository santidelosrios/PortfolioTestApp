import { APIGatewayProxyHandler, APIGatewayEvent, Context } from 'aws-lambda';
import { getUserPortfolio, updateUserPortfolio, getTweets } from '../../queries/queries';
import 'source-map-support/register';


export const sendResponse = (response: any, statusCode: number): any => (
  {
    statusCode,
    body: JSON.stringify(response),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    }
  }
)

export const get: APIGatewayProxyHandler = async (event: APIGatewayEvent, _context: Context) => {
  const id = event.pathParameters.id;

  try {
    const userPortfolio = await getUserPortfolio(id)
    const userTweets = await getTweets(userPortfolio.twitterUserName, userPortfolio.title)

    userPortfolio.portfolioTweets = userTweets;

    return sendResponse(userPortfolio, 200)
  
  } catch (err) {
    let statusCode = 500
    if(err.source === 'getUserPortfolio') {
      statusCode = 404
    }

    delete err.source
    return sendResponse(err, statusCode)
  }
}

export const update: APIGatewayProxyHandler = async (event: APIGatewayEvent, _context: Context) => {
  const id = event.pathParameters.id;
  const userPortfoltio: {firstName: string, lastName: string, description: string, imageUrl: string, title: string, twitterUserName: string} = JSON.parse(event.body);

  try {
    await updateUserPortfolio(id, userPortfoltio)
    
    return sendResponse({success: true}, 200);
  } catch (err) {
    return sendResponse(err, 400);
  }
}

export const create: APIGatewayProxyHandler = async (event: APIGatewayEvent, _context: Context) => {
  try {
    return sendResponse({msg: 'New function POST'}, 200)
  } catch (err) {
    return sendResponse(err, 400);
  }
}