import { User } from './types';
import { v4 as uuidv4 } from 'uuid';
//:{userArr: User[], getAll: () =>  User[]}
const userArr: User[] = [
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
// let bd = {

//   // userArr:[
//   //   {
//   //     id: uuidv4(),
//   //     username: 'palasja',
//   //     age: 18,
//   //     hobbies: ['coding', 'anime'],
//   //   },
//   //   {
//   //     id: uuidv4(),
//   //     username: 'Ya',
//   //     age: 33,
//   //     hobbies: ['qwe', 'asd'],
//   //   }
//   // ],
//   getAll: (): User[] => {return userArr},
//   add: (u: User) => {userArr.push(u)}
// }

export default userArr;
