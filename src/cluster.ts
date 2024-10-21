import cluster from 'node:cluster';
import http from 'node:http';
import { availableParallelism } from 'node:os';
import process from 'node:process';
import RunServer from './server';
import 'dotenv/config';

const numCPUs = availableParallelism();
const PORT = process.env.PORT;
const workerCount = numCPUs - 1;
const maxPort = Number(PORT) + workerCount;
let activePort = Number(PORT);

if (cluster.isPrimary) {
  // Fork workers.
  for (let i = Number(PORT) + 1; i <= maxPort; i++) {
    cluster.fork({ workerServerPort: i });
  }

  const getPort = () => {
    if (activePort == maxPort) activePort = Number(PORT);
    activePort++;
    return activePort.toString();
  };

  http
    .createServer((req, res) => {
      const url = new URL(`http://localhost:${PORT}${req.url}`);
      url.port = getPort();
      res.writeHead(307, { Location: url.href });
      res.end();
    })
    .listen(PORT);
  console.log(`Prymary on port ${PORT} started`);
} else {
  console.log(`Worker on port ${process.env.workerServerPort} started`);
  RunServer(Number(process.env.workerServerPort));
}
