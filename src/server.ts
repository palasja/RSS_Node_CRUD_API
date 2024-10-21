import http, { IncomingMessage } from 'node:http';
import { sendData } from './helper';
import del from './crud/delete';
import post from './crud/post';
import put from './crud/PUT'
import get from './crud/get';

const endpointName = new RegExp('/users');

const RunServer = (port: number) => {
  const server = http.createServer((req: IncomingMessage, res) => {
    try{
      if (process.env.workerServerPort) console.log(`Cluster: servre work on ${port}`);
      if (!endpointName.test(req.url)) {
        sendData(res, {
          statusCode: 404,
          sendObject: {
            message: 'Non-existing endpoints',
          },
        });
        return;
      }
  
      let body = '';
      req.on('data', (chunk) => {
        body += chunk;
      });
      req.on('end', () => {
        if (req.method == 'GET') {
          get(req, res);
        } else if (req.method == 'POST') {
          post(req, res, body);
        } else if (req.method == 'DELETE') {
          del(req, res);
        } else if (req.method == 'PUT') {
          put(req, res, body);
        }
        return;
      });
    } catch{
      sendData(res, {
        statusCode: 500 ,
        sendObject: {message: 'Something goes wrong on the server, please try later'} ,
      });
    }
  });

  server.listen(port);
};

export default RunServer;
