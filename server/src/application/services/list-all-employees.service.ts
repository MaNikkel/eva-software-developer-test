import { EmployeeRepository } from '../../domain/repository/employee.repository';

export class ListAllEmployeesService {
  constructor(private employeeRepository: EmployeeRepository) {}

  async execute() {
    const employees = await this.employeeRepository.listAll();

    return employees;
  }
}
