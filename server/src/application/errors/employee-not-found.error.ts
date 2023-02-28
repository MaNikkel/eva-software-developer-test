export class EmployeeNotFoundError {
  constructor(public message: string, public details?: unknown) {}
}
