import 'dotenv/config';
import RunServer from './server';
import counterModule from './test' ;
RunServer(Number(process.env.port), counterModule.getInstance());
