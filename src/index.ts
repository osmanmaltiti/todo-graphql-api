import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import morgan from 'morgan';
import graphqlServer from './graphql';

const app = express();

dotenv.config();

const PORT = process.env.PORT;

app.use(morgan('dev'));
app.use('/graphql', graphqlServer);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ status: 'success', data: 'Hello world of graphQL' });
});

app.listen(PORT, () => {
  console.log('Server is listening on port: ' + PORT);
  console.log('GraphQL server is listening on route: ' + PORT + '/graphql');
});
