import { User } from "./types";
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

export default userArr
