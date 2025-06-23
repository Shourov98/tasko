import 'dotenv/config';
import app from './app.js';
import { connectDB } from './config/db.config.js';
import swaggerUi from 'swagger-ui-express';
import { specs } from './config/swagger.config.js';

const PORT = process.env.PORT || 5000;

(async () => {
  await connectDB();               // blocks until Mongo handshake finishes
  
  // Add Swagger UI
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  
  app.listen(PORT, () =>
    console.log(`🚀  API ready on http://localhost:${PORT}`)
  );
})();
