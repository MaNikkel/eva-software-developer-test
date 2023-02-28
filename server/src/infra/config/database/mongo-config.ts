import { Db, MongoClient as MongoDBClient } from 'mongodb';

export class MongoClient {
  private static instance: MongoClient;
  private mongoClient!: MongoDBClient;
  private url?: string;

  private constructor() {
    console.log('initializing database');
  }

  public connect() {
    this.url = <string>process.env.MONGO_URL;

    this.mongoClient = new MongoDBClient(this.url, {
      auth: {
        username: process.env.MONGO_USER,
        password: process.env.MONGO_PASS,
      },
    });
  }

  public getDb(): Db {
    return this.mongoClient.db('eva-test');
  }

  public getClient(): MongoDBClient {
    return this.mongoClient;
  }

  static getInstance(): MongoClient {
    if (MongoClient.instance === undefined) {
      this.instance = new MongoClient();
    }

    return this.instance;
  }
}
