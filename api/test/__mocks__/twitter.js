let twitter = jest.createMockFromModule('twitter')

function get(path, params, callback) {
  if (params.screen_name === 'test1') {
    const tweets = [
      {
        text: 'Text 1',
        user: {
          profile_image_url_https: 'image'
        }
      },
      {
        text: 'Text 2',
        user: {
          profile_image_url_https: 'image'
        }
      },
      {
        text: 'Text 3',
        user: {
          profile_image_url_https: 'image'
        }
      },
      {
        text: 'Text 4',
        user: {
          profile_image_url_https: 'image'
        }
      },
      {
        text: 'Text 5',
        user: {
          profile_image_url_https: 'image'
        }
      },
    ]
    callback(null, tweets, null)
  } else {
    callback('Something went wrong', [], null)
  }
}

twitter = function(parms) {
  this.get = get
}

module.exports = twitter