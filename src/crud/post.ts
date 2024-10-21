import { ServerResponse } from 'http';
import { sendData } from '../helper';
import { User } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { userArr } from '../db';

const post = (res: ServerResponse, body: string) => {
  const bodyO = JSON.parse(body);
  const newUser: {
    [username: string]: string | undefined | string[] | number;
  } = {
    username: undefined,
    hobbies: undefined,
    age: undefined,
  };

  for (const prop in newUser) {
    if (bodyO[prop] == undefined) {
      sendData(res, {
        statusCode: 404,
        sendObject: {
          message: `Requset doen't have ${prop} value`,
        },
      });
      return;
    } else {
      newUser[prop] = bodyO[prop];
    }
  }

  (newUser as User).id = uuidv4();
  userArr.push(newUser as User);
  sendData(res, {
    statusCode: 200,
    sendObject: newUser,
  });
};

export default post;
