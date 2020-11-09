const env = {
  TW_CONSUMER_KEY: 'fake_key1',
  TW_CONSUMER_SECRET: 'fake_key2',
  TW_ACCESS_TOKEN: 'fake_secret3',
  TW_ACCESS_TOKEN_SECRET: 'fake_secret4'
};

process.env = {
  ...process.env,
  ...env,
};