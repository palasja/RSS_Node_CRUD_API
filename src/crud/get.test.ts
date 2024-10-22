import httpMocks from 'node-mocks-http';
import get from './get';
import { v4 as uuidv4 } from 'uuid';
import * as db from '../db';

describe('test responce status', () => {
  const testArr = [
    {
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
    },
  ];
  test('wrong id ', () => {
    const request = httpMocks.createRequest({
      method: 'GET',
      url: '/users/23',
    });
    const response = httpMocks.createResponse();

    get(request, response);
    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response._getData())).toHaveProperty('message');
    expect(JSON.parse(response._getData()).message).toBe('userId is invalid');
  });

  test('get all users ', () => {
    const request = httpMocks.createRequest({
      method: 'GET',
      url: '/users',
    });
    const response = httpMocks.createResponse();

    jest.spyOn(db, 'getAll').mockImplementation(() => testArr);

    get(request, response);
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response._getData())).toHaveProperty('data');
    expect(JSON.parse(response._getData()).data).toMatchObject(testArr);
  });

  test('get id not uuid ', () => {
    const request = httpMocks.createRequest({
      method: 'GET',
      url: `/users/${uuidv4()}`,
    });
    const response = httpMocks.createResponse();

    jest.spyOn(db, 'getAll').mockImplementation(() => testArr);

    get(request, response);
    expect(response.statusCode).toBe(404);
    expect(JSON.parse(response._getData())).toHaveProperty('message');
    expect(JSON.parse(response._getData()).message).toBe(`user doesn't exist`);
  });

  test('get user by id', () => {
    const request = httpMocks.createRequest({
      method: 'GET',
      url: `/users/${testArr[0].id}`,
    });
    const response = httpMocks.createResponse();

    jest.spyOn(db, 'getAll').mockImplementation(() => testArr);

    get(request, response);
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response._getData())).toHaveProperty('user');
    expect(JSON.parse(response._getData()).user).toMatchObject(testArr[0]);
  });
});
