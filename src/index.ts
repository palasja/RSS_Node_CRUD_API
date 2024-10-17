import path from 'node:path';
import { User } from './user';

import http, { ClientRequest, IncomingMessage, ServerResponse } from 'node:http';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

let userArr: User[] = [
  {
    id: uuidv4(),
    username: 'palasja',
    age: 18,
    hobbies: ['coding', 'anime'],
  },
  {
    id: uuidv4(),
    username: 'Ya',
    age: 33,
    hobbies: ['qwe', 'asd'],
  }
];
type SendData = {
  statusCode: number,
  sendObject: Object
}
const endpointName = new RegExp('/users');

const sendData = (res: ServerResponse, data: SendData) => {
  res.writeHead(data.statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data.sendObject));
}

const get = (req: IncomingMessage, res: ServerResponse) => {
    const arrArg = req.url.split('/');
    if(arrArg.length == 2 ) {
      sendData(res, {
        statusCode: 200, 
        sendObject: {
          data: userArr,
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

    const user = userArr.find( u => u.id == id);
    if(user == undefined){
      sendData(res, {
        statusCode: 400, 
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

  const user = userArr.find( u => u.id == id);
  if(user == undefined){
    sendData(res, {
      statusCode: 400, 
      sendObject: {
        message: `user doesn't exist`
    }});
  } else {
    userArr = userArr.filter(u => u.id != id);
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

  const user = userArr.find( u => u.id == id);
  if(user == undefined){
    sendData(res, {
      statusCode: 400, 
      sendObject: {
        message: `user doesn't exist`
    }});
  } else {
    const arrId = userArr.findIndex( u => u.id == id);
    userArr[arrId] = {...userArr[arrId], ...bodyO};
    sendData(res, {
      statusCode: 200 , 
      sendObject: userArr[arrId]});
   }
}
const server = http.createServer((req:IncomingMessage, res) => {
  if(!endpointName.test(req.url)) {
    sendData(res, {
      statusCode: 404 , 
      sendObject: {
      message: 'Non-existing endpoints',
    }});
    return;
  }

  let body = '';
  req.on('data', (chunk) => {
      body += chunk;
  });
  req.on('end', () => {
    if(req.method == 'GET'){
      get(req, res);
      return;
    } else  if(req.method == 'DELETE'){
      del(req, res);
      return;
    } else  if(req.method == 'PUT'){
      put(req, res, body);
      return;
    }
  });


  

});

server.listen(8000);