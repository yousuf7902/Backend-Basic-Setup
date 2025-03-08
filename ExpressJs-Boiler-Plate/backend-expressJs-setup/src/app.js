import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { errorConverter, errorHandler } from './middlewares/errorMiddleware.js';
import cookieParser from 'cookie-parser';


const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

// Routes


// Error Handling
app.use(errorConverter);
app.use(errorHandler);

export default app; 