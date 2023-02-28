import './mongo-conncection.instance';
import { MongoClient } from '../config/database/mongo-config';
import { MongoEmployeeRepository } from '../repositories/mongo/employee.repository';

export const employeeRepository = new MongoEmployeeRepository(
  MongoClient.getInstance(),
);
