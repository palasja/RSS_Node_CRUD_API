import { IncomingMessage, ServerResponse } from 'http';
import { sendData } from '../helper';
import { validate as uuidValidate } from 'uuid';
import { userArr } from '../db';

const get = (req: IncomingMessage, res: ServerResponse) => {
  const arrArg = req.url!.split('/');
  if (arrArg.length == 2) {
    sendData(res, {
      statusCode: 200,
      sendObject: {
        data: userArr,
      },
    });
    return;
  }
  const id = arrArg[2];
  if (!uuidValidate(id)) {
    sendData(res, {
      statusCode: 400,
      sendObject: {
        message: 'userId is invalid',
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
    return;
  } else {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        user: user,
      })
    );
    return;
  }
};

export default get;
