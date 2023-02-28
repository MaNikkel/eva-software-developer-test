import { Response } from 'express';
import Joi from 'joi';
import { validate } from '../validation.middleware';

describe('Validation Middleware', () => {
  const schema = Joi.object().keys({
    name: Joi.string().max(5).min(2),
  });

  it('should validate correctly', () => {
    const res = {
      status: jest.fn(),
    };
    const next = jest.fn();

    validate(schema, { name: 'abc' })(res as unknown as Response, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledTimes(0);
  });

  it('should return validation error', () => {
    const res = {
      status: jest.fn(),
    };
    const next = jest.fn();

    validate(schema, { name: 'a' })(res as unknown as Response, next);

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(next).toHaveBeenCalledTimes(0);
  });
});
