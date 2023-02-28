import { MongoClient } from '../config/database/mongo-config';

MongoClient.getInstance().connect();

export const mongoConnection = MongoClient.getInstance();
