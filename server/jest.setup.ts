import { MongoMemoryServer } from 'mongodb-memory-server';
import { RedisMemoryServer } from 'redis-memory-server';

import { MongoClient } from './src/infra/config/database/mongo-config';

jest.setTimeout(20000);

let mongod: MongoMemoryServer;

// const redisServer = new RedisMemoryServer();

beforeAll(async () => {
  mongod = await MongoMemoryServer.create({
    instance: {
      dbName: 'eva-test',
    },
  });

  // const host = await redisServer.getHost();
  // const port = await redisServer.getPort();

  // process.env.REDIS_HOST = host;
  // process.env.REDIS_PORT = String(port);

  const uri = mongod.getUri();

  process.env.MONGO_URL = uri;

  MongoClient.getInstance().connect();
});

afterAll(async () => {
  await MongoClient.getInstance().getClient().close();
  await mongod.stop();
});
