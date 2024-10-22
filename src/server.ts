import http, { IncomingMessage, ServerResponse } from 'node:http';
import { sendData } from './helper';
import del from './crud/delete';
import post from './crud/post';
import put from './crud/put';
import get from './crud/get';

const endpointName = new RegExp('/users');

const RunServer = (port: number) => {
  const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    try {
      if (process.env.workerServerPort) console.log(`Cluster: servre work on ${port}`);
      if (!endpointName.test(req.url!)) {
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
        switch (req.method) {
          case 'GET':
            get(req, res);
            return;
          case 'POST':
            post(res, body);
            return;
          case 'DELETE':
            del(req, res);
            return;
          case 'PUT':
            put(req, res, body);
            return;
          default:
            return;
        }
      });
    } catch {
      sendData(res, {
        statusCode: 500,
        sendObject: { message: 'Something goes wrong on the server, please try later' },
      });
    }
  });

  server.listen(port);
};

export default RunServer;
