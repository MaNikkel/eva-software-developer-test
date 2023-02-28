import { Employee } from '../../domain/entities/employee.entity';
import { employeeRepository } from '../instances/employee-repository.instance';
import { faker } from '@faker-js/faker';

export async function populate() {
  for (let i = 0; i < 10; i++) {
    const employee = new Employee({
      name: faker.name.fullName(),
      registrationNumber: String(i),
    });

    console.log(employee);

    await employeeRepository.create(employee);
  }
}
