import { User } from './types';

// import 'dotenv/config()';
import http, { IncomingMessage, ServerResponse } from 'node:http';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
import { sendData  } from './helper';
import userArr from './db';

const endpointName = new RegExp('/users');
let userDB = userArr;

const get = (req: IncomingMessage, res: ServerResponse) => {
    const arrArg = req.url.split('/');
    if(arrArg.length == 2 ) {
      sendData(res, {
        statusCode: 200, 
        sendObject: {
          data: userDB,
      }});
      return;
    }
    const id = arrArg[2];
    if(!uuidValidate(id)){
      sendData(res, {
        statusCode: 400, 
        sendObject: {
          message: 'userId is invalid'
      }});
      return;
    }

    const user = userDB.find( u => u.id == id);
    if(user == undefined){
      sendData(res, {
        statusCode: 404, 
        sendObject: {
          message: `user doesn't exist`
      }});
      return;
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        user: user
      }));
      return;
    }
}
const post = (req: IncomingMessage, res: ServerResponse, body: string) => {
  const bodyO = JSON.parse(body);
  const newUser = {
    username: undefined,
    hobbies: undefined,
    age: undefined,
  };

for (const prop in newUser) {
  if(bodyO[prop] == undefined) {
    sendData(res, {
      statusCode: 404 , 
      sendObject: {
      message: `Requset doen't have ${prop} value`,
    }});
    return;
  } else {
    newUser[prop] = bodyO[prop];
  }
}

(newUser as User).id = uuidv4();
userDB.push(newUser as User);
sendData(res, {
  statusCode: 200 , 
  sendObject: newUser
});
}
const del = (req: IncomingMessage, res: ServerResponse) => {
  const arrArg = req.url.split('/');
  const id = arrArg[2];
  if(!uuidValidate(id)){
    sendData(res, {
      statusCode: 400, 
      sendObject: {
        message: `userId is invalid`
    }});
    return;
  }

  const user = userDB.find( u => u.id == id);
  if(user == undefined){
    sendData(res, {
      statusCode: 404, 
      sendObject: {
        message: `user doesn't exist`
    }});
  } else {
    userDB = userDB.filter(u => u.id != id);
    res.writeHead(204, { 'Content-Type': 'application/json' });
    res.end();
  }
}
const put = (req: IncomingMessage, res: ServerResponse, body: string) => {
  const bodyO = JSON.parse(body);
  const arrArg = req.url.split('/');
  const id = arrArg[2];
  if(!uuidValidate(id)){
    sendData(res, {
      statusCode: 400, 
      sendObject: {
        message: `userId is invalid`
    }});
    return;
  }

const user = userDB.find( u => u.id == id);
  if(user == undefined){
    sendData(res, {
      statusCode: 404, 
      sendObject: {
        message: `user doesn't exist`
    }});
  } else {
    const arrId = userDB.findIndex( u => u.id == id);
    
    userDB[arrId] = {...userDB[arrId], ...bodyO};
    sendData(res, {
      statusCode: 201 ,
      sendObject: userDB[arrId]});
   }
}

const RunServer = (port: number, counter) => {
   const server = http.createServer((req:IncomingMessage, res) => {
    counter.increaseCounter();
    console.log(counter.getCounter());
    if(process.env.workerServerPort) console.log(`Cluster: servre work on ${port}`)
    if(!endpointName.test(req.url)) {
      sendData(res, {
        statusCode: 404 , 
        sendObject: {
        message: 'Non-existing endpoints',
      }
    });
      return;
    }
  
    let body = '';
    req.on('data', (chunk) => {
        body += chunk;
    });
    req.on('end', () => {
      if(req.method == 'GET'){
        get(req, res);
      } else if(req.method == 'POST'){
        post(req, res, body);
      } else if(req.method == 'DELETE'){
        del(req, res);
      } else if(req.method == 'PUT'){
        put(req, res, body);
      }
      return;
    });
  });
  
  server.listen(port);
}

//RunServer();

export default RunServer;