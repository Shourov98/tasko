import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { authRouter } from "./routes/auth.routes.js";
import { protectedRouter } from "./routes/protected.routes.js";
import swaggerUi from 'swagger-ui-express';
import { specs } from "./config/swagger.config.js";




const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes will be added here

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use("/api/auth", authRouter);
app.use("/api/protected", protectedRouter);

export default app;