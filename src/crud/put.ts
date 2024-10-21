import { IncomingMessage, ServerResponse } from 'http';
import { sendData } from '../helper';
import { validate as uuidValidate } from 'uuid';
import { getAll } from '../db';

const put = (req: IncomingMessage, res: ServerResponse, body: string) => {
  const bodyO = JSON.parse(body);
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

  const user = getAll().find((u) => u.id == id);
  if (user == undefined) {
    sendData(res, {
      statusCode: 404,
      sendObject: {
        message: `user doesn't exist`,
      },
    });
  } else {
    const arrId = getAll().findIndex((u) => u.id == id);

    getAll()[arrId] = { ...getAll()[arrId], ...bodyO };
    sendData(res, {
      statusCode: 201,
      sendObject: getAll()[arrId],
    });
  }
};

export default put;
