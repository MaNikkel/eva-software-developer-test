import { Collection } from 'mongodb';
import { MongoClient } from '../../config/database/mongo-config';
import { Employee } from '../../../domain/entities/employee.entity';
import { Journey } from '../../../domain/value-objects/journey.valueobject';
import { EmployeeRepository } from '../../../domain/repository/employee.repository';

export class MongoEmployeeRepository implements EmployeeRepository {
  private employeeCollection: Collection;

  constructor(private mongoClient: MongoClient) {
    this.employeeCollection = this.mongoClient.getDb().collection('employee');
  }

  async setStartDate(id: string, date: Date): Promise<void> {
    await this.employeeCollection.findOneAndUpdate(
      { id: id },
      {
        $set: {
          start_date: date.toISOString(),
        },
      },
    );
  }

  async create(employee: Employee): Promise<void> {
    await this.employeeCollection.insertOne({
      id: employee.id,
      name: employee.name,
      registration_number: employee.registrationNumber,
      journey: {
        slug: employee?.journey?.slug,
        name: employee?.journey?.name,
      },
    });
  }
  async getById(id: string): Promise<Employee> {
    const data = await this.employeeCollection.findOne({ id: id });

    if (!data) {
      return null;
    }

    return new Employee({
      id: data.id,
      name: data.name,
      registrationNumber: data.registration_number,
      startDate: new Date(data.start_date),
    });
  }
  async listAll(): Promise<Employee[]> {
    const result = await this.employeeCollection.find().toArray();

    return result.map(
      (e) =>
        new Employee({
          id: e.id,
          name: e.name,
          registrationNumber: e.registration_number,
          startDate: new Date(e.start_date),
        }),
    );
  }
  async linkJourney(id: string, journey: Journey): Promise<void> {
    await this.employeeCollection.findOneAndUpdate(
      { id: id },
      {
        $set: {
          journey: {
            slug: journey.slug,
            name: journey.name,
          },
        },
      },
    );
  }
}
