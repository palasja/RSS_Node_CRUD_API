import { IncomingMessage, ServerResponse } from 'http';
import { userArr, change } from '../db';
import { sendData } from '../helper';
import { validate as uuidValidate } from 'uuid';

const del = (req: IncomingMessage, res: ServerResponse) => {
  const arrArg = req.url!.split('/');
  const id = arrArg[2];
  if (!uuidValidate(id)) {
    sendData(res, {
      statusCode: 400,
      sendObject: {
        message: `userId is invalid`,
      },
    });
    return;
  }

  const user = userArr.find((u) => u.id == id);
  if (user == undefined) {
    sendData(res, {
      statusCode: 404,
      sendObject: {
        message: `user doesn't exist`,
      },
    });
  } else {
    change(userArr.filter((u) => u.id != id));
    res.writeHead(204, { 'Content-Type': 'application/json' });
    res.end();
  }
};

export default del;
