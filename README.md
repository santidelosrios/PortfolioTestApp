# PortfolioTestApp

Zemoga test for NodeJS role. This applications consists of one UI based on React and an REST API in NodeJS deployed with Serverless Framework in a Lambda + API Gateway architecture. For the Database, it is using AWS' DynamoDB.

## UI
To run the UI of this project, go the ui folder, install the dependencies and run the project.
NOTE: make sure that port 3000 in your local machine is available.

```batch
cd ./ui
npm install
npm run start
```

## API 
The API is already deploy in AWS with two lambdas and exposed with an API Gateway.

Resource: /user-portfolio
1. METHOD: GET; path params: {id}; PATH: /user-portfolio/{id}
2. METHOD: PUT; path params: {id}; PATH: /user-portfolio/{id}; Expected body: 
```javascript
{
  firstName: 'Mickey',
  lastName: 'Mouse',
  description: 'Lorem Impsun text to describe the portfolio of the user',
  imageUrl: 'https://link.to.image.com
  twitterUserName: 'username',
  title: 'Title for the Twitter's timeline header'
}
```
### Database structure
A table in DynamoDB was created, with one attribute as the primary key. Structure:
```
id: String (primary key)
firstName: String
lastName: String
description: String
imageUrl: String
twitterUserName: String
title: String
```

### Project architecture
The foundation of this project is the Serverless framework that allows to quickly develop a REST API in a serverless architecture. It also handles the infrastucture management in AWS and the deploys of newly developed code as well.

### Technologies
The project was developed with NodeJS 12.x, Typescript and Jest for the unit tests. It also uses several NPM modules for AWS management, DynamoDB access, linting and source mapping.

### CI/CD
The project uses Github Actions to automatically test and deploy the services in AWS. The configuration file can be found in `.github/workflows/main.yml`. To deploy new code, just push your changes into the main branch and Github will trigger the process. 

**NOTE: In a 'real-world escenario, the main branch would be protected and the CI/CD should only be triggered in a merge from a pull request.**

### Test the API
To test how the development process works, follow these steps:
1. Navigate to `api` folder
  ```**batch**
  cd ./api
  ``` 
2. Add a new function in `serverless.ts` file after the `updateUserPortfolio` object:

  ```javascript
  'createUserPortfolio': {
    handler: 'src/user-portfolio/userPortfolio.create,
    events: [
      {
        http: {
          method: 'post',
          path: 'user-portfolio/{id},
          cors: true
        }
      }
    ]
  }
  ```
2. Create the `create` function in `./src/user-portfolio/userPortfolio.ts` file:
  ```javascript
  export const create: APIGatewayProxyHandler = async (event: APIGatewayEvent, _context: Context) => {
    try {
      return sendResponse({msg: 'New function POST'}, 200)
    } catch (err) {
      return sendResponse(err, 400);
    }
  }
  ```
3. Go back to the root folder of the project and push the changes.
4. Go to the actions bar in Github and watch the CI/CD process run
5. Test the function at POST `https://agspzq0cx8.execute-api.us-east-2.amazonaws.com/dev/user-portfolio/1` using Postman.

**Aditional note: The PUT /user-portfolio resource is not integrated in the UI, it can be tested in Postman**


