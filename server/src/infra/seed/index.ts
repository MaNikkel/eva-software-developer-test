import { populateEmployee } from './populate-employee.seed';
import { populateJourneys } from './populate-journey.seed';

async function seed() {
  await populateEmployee();
  await populateJourneys();

  console.info('Done!');
  process.exit();
}

seed();
