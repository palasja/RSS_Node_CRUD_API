type User = {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
};

type SendData = {
  statusCode: number;
  sendObject: object;
};

export { User, SendData };
