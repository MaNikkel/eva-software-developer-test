import './mongo-conncection.instance';
import { MongoClient } from '../config/database/mongo-config';
import { MongoJourneyRepository } from '../repositories/mongo/journey.repository';

export const journeyRepository = new MongoJourneyRepository(
  MongoClient.getInstance(),
);
