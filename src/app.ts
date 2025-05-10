import { Request, Response } from 'express';
import express from 'express';
import apiRouter from './routes/api.routes';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRouter);

app.get('/', (req: Request, res: Response) => {
  console.log('GET route hit');
  res.send('Welcome to the Blog API');
});

export default app;
