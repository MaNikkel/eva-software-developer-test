import { Employee } from '../entities/employee.entity';
import { Journey } from '../entities/journey.entity';

export interface EmployeeRepository {
  create(employee: Employee): Promise<void>;
  getById(id: string): Promise<Employee>;
  listAll(): Promise<Employee[]>;
  linkJourney(id: string, journey: Journey): Promise<void>;
}
