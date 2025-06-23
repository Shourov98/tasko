import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { authRouter } from "./routes/auth.routes.js";
import { protectedRouter } from "./routes/protected.routes.js";
import swaggerUi from 'swagger-ui-express';
import { specs } from "./config/swagger.config.js";
import { authGuard } from "./middlewares/auth.middleware.js";
import { taskRouter } from "./routes/task.routes.js";


const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Routes will be added here
app.use("/api/auth", authRouter);
app.use("/api/tasks", authGuard, taskRouter);
app.use("/api/protected", protectedRouter);

export default app;