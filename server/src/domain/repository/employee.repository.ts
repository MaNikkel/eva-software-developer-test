import { Employee } from '../entities/employee.entity';

export interface EmployeeRepository {
  create(employee: Employee): Promise<void>;
  getById(id: string): Promise<Employee>;
  listAll(): Promise<Employee[]>;
  linkJourney(journeySlug: string): Promise<void>;
}
