import { EmployeeRepository } from '../../domain/repository/employee.repository';

export class ListAllEmployeesService {
  constructor(private employeeRepository: EmployeeRepository) {}

  async execute() {
    const employees = await this.employeeRepository.listAll();

    const presenter = employees.map((e) => ({
      name: e.name,
      registrationNumber: e.registrationNumber,
      id: e.id,
      startDate: e.startDate,
      journey: {
        slug: e?.journey?.slug,
        name: e?.journey?.name,
      },
    }));

    return presenter;
  }
}
