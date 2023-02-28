import { MongoMemoryServer } from 'mongodb-memory-server';

import { MongoClient } from './src/infra/config/database/mongo-config';

jest.setTimeout(20000);

let mongod: MongoMemoryServer;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create({
    instance: {
      dbName: 'eva-test',
    },
  });

  const uri = mongod.getUri();

  process.env.MONGO_URL = uri;

  MongoClient.getInstance().connect();
});

afterAll(async () => {
  await MongoClient.getInstance().getClient().close();
  await mongod.stop();
});
