import { User } from './types';
import { v4 as uuidv4 } from 'uuid';
//:{userArr: User[], getAll: () =>  User[]}
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
  },
];

const getAll = () => {
  return userArr;
};

const change = (users: User[]) => {
  userArr = users;
};

export { userArr, change, getAll };
