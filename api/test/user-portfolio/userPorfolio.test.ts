import { sendResponse } from '../../src/user-portfolio/userPortfolio'


describe('user-portfolio service tests', () => {
  test('sendResponse. Expect complete response', () => {
    const expected = {
      statusCode: 200,
      body: '{"success":true}',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      }
    }

    const received = sendResponse({success: true}, 200)

    expect(received).toStrictEqual(expected)
  })
})