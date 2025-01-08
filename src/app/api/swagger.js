import express from 'express';
import swaggerUi from 'swagger-ui-express';

const app = express();

// Load OpenAPI definition
const openapiDefinition = require('../openapi.yaml');

// Configure Swagger UI
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiDefinition));

export default app;