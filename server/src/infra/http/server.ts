import express, { Response, Request } from 'express';
import indexRouter from './routes';
const app = express();

app.use(express.json());

app.use(express.static('public'));
app.use('/', indexRouter);

process.on('unhandledRejection', (error: Error) => {
  console.error(error);
});

process.on('uncaughtException', (error: Error) => {
  console.error(error);
});

// Error handler
app.use((error: Error, req: Request, res: Response) => {
  console.error(error);

  return res.status(500).json({ message: error.message, req: req.url });
});

export default app;
