import { populate } from './populate-employee.seed';

async function seed() {
  await populate();
}

seed();
