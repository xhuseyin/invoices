import nextConnect from 'next-connect';
import database from './database';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const middleware = nextConnect();

middleware.use(cors());

middleware.use(database);

export default middleware;
