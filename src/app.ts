import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger/swagger.json';
import agricultureRoutes from './app/routes/agriculture.routes';
import { errorMiddleware } from './app/middlewares/error.middleware';

const app: Application = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api/agriculture', agricultureRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(errorMiddleware);

export default app;