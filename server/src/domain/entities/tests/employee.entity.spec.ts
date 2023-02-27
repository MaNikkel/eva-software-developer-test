import { Employee } from '../employee.entity';

describe('Employee entity', () => {
  it('should create a new employee', () => {
    const name = 'Joe Doe';
    const registrationNumber = '123';

    const employee = new Employee({ name, registrationNumber });

    expect(employee.name).toBe(name);
    expect(employee.registrationNumber).toBe(registrationNumber);
  });
});
