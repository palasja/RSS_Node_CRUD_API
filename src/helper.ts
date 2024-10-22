import { ServerResponse } from 'node:http';
import { SendData } from './types';

const sendData = (res: ServerResponse, data: SendData) => {
  res.writeHead(data.statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data.sendObject));
};

export { sendData };
