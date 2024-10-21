import httpMocks from 'node-mocks-http';
import { v4 as uuidv4} from 'uuid';
import * as db from '../db';
import put from './put';

describe('test responce status', () => {
  const testArr = [  {
    id: uuidv4(),
    username: 'test1',
    age: 18,
    hobbies: ['hobbies1', 'hobbies2'],
  },
  {
    id: uuidv4(),
    username: 'test2',
    age: 32,
    hobbies: ['hobbies3', 'hobbies4'],
  }
];
  test('wrong id ', () => {
    const request = httpMocks.createRequest({
      method: 'PUT',
      url: '/users/23',
    });
    const response = httpMocks.createResponse();

    put(request, response, JSON.stringify({}));
    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response._getData())).toHaveProperty ('message');
    expect(JSON.parse(response._getData()).message).toBe('userId is invalid');
  });

  test('get id not uuid ', () => {
    const request = httpMocks.createRequest({
      method: 'PUT',
      url: `/users/${uuidv4()}`,
    });
    const response = httpMocks.createResponse();

    jest.spyOn(db, 'getAll').mockImplementation(() => testArr);

    put(request, response, JSON.stringify({}));
    expect(response.statusCode).toBe(404);
    expect(JSON.parse(response._getData())).toHaveProperty ('message');
    expect(JSON.parse(response._getData()).message).toBe(`user doesn't exist`);
  });

  test('same user id but change data', () => {
    const updateUser = {
      username: 'test3',
      age: 50,
      hobbies: ['hobbies4', 'hobbies5'],
    }
    const request = httpMocks.createRequest({
      method: 'PUT',
      url: `/users/${testArr[0].id}`,
      body: updateUser,
    });
    const response = httpMocks.createResponse();

    jest.spyOn(db, 'getAll').mockImplementation(() => testArr);

    put(request, response, JSON.stringify(updateUser));
    expect(response.statusCode).toBe(201);
    expect(JSON.parse(response._getData()).id).toBe(testArr[0].id);
    expect(JSON.parse(response._getData()).username).toBe(updateUser.username);
  });
})