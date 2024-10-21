import 'dotenv/config';
import RunServer from './server';
RunServer(Number(process.env.port));
