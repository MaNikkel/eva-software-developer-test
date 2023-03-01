import express, { Response, Request, NextFunction } from 'express';
import indexRouter from './routes';
import cors from 'cors';
const app = express();

app.use(express.json());

app.use(cors());

app.use(express.static('public'));
app.use('/', indexRouter);

app.use((err, _: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.render('error', { error: err });
});

export default app;
