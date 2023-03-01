import { NextFunction, Response } from 'express';
import { Schema } from 'joi';

export const validate =
  (schema: Schema, data: unknown) => (res: Response, next: NextFunction) => {
    const { error } = schema.validate(data);

    if (error) {
      return res?.status(400)?.send(error);
    }

    next();
  };
