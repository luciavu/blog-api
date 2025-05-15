import { Request, Response } from 'express';
import express from 'express';
import cors from 'cors';
import apiRouter from './routes/api.routes';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api', apiRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Blog API');
});

export default app;
