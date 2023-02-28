import { journeys } from '../instances/journeys.instance';

Object.keys(journeys.processors).forEach((key) => {
  journeys.processors[key].process();
});
