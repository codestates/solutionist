import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import cookieparser from 'cookie-parser';
import { createConnection, useContainer } from 'typeorm';
import { Container } from 'typeorm-typedi-extensions';
import errorHandler from './error/errorHandler';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import usersRouter from './routes/users';
import myPage from './routes/myPage';
import setsRouter from './routes/sets';
import 'dotenv/config';

useContainer(Container);

// db connection
createConnection()
  .then(async (connection) => {
    console.log('DB connection complete');
  })
  .catch((error) => console.log(error));

const port = 4000;
const app = express();

app.use(cookieparser());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: true,
    allowedHeaders: ['Authorization, Content-Type'],
    //exposedHeaders: ['Authorization'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  })
);

if (process.env.SERVER_SWAGGER) {
  const swaggerDocument = YAML.load('./solutionist.yaml');
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

// basic routing
app.get('/', (req, res) => {
  res.send('hello');
});
app.use('/users', usersRouter);
app.use(myPage);
// routing to controllers
app.use(setsRouter);

// error handler
app.use(errorHandler);

// server listening
app.listen(port, () => {
  // console.log('rds username', process.env.RDS_USERNAME);
  // console.log('rds password', process.env.RDS_PASSWORD);
  // console.log('rds port', process.env.RDS_PORT);
  // console.log('rds database', process.env.RDS_DATABASE);
  // console.log('rds host', process.env.RDS_HOST);
  // console.log('access', process.env.ACCESS_SECRET);
  // console.log('secret', process.env.SECRET_KEY);
  // console.log('google id', process.env.GOOGLE_CLIENT_ID);
  // console.log('google secret', process.env.GOOGLE_CLIENT_SECRET);
  console.log('domain', process.env.DOMAIN);

  console.log(new Date());
  console.log(
    `server is listening on ${port} \nswagger hub ${
      process.env.SERVER_SWAGGER ? 'on' : 'off'
    }`
  );
  console.log(new Date());
});
