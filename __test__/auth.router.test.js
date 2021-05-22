'use strict';

const base64 = require('base-64');
const supergoose = require('@code-fellows/supergoose');
const server = require('../src/server');
const request = supergoose(server.app);

describe('signup auth router', () => {
  it('should create user succesfully', async () => {
    //arrange
    let data = {
      username: 'wesam',
      password: 'mypassword',
    };
    //act
    const response = await request.post('/signup').send(data);
    //assert
    expect(response.status).toBe(201);
    expect(response.body._id.length).toBeGreaterThan(0);
    expect(response.body.password.length).toBeGreaterThan(0);
    expect(response.body.username).toBe(data.username);
  });

  it('should return 403 status code on missing input', async () => {
    //arrange
    let data = {
      username: 'wesam',
    };
    //act
    const response = await request.post('/signup').send(data);
    //assert
    expect(response.status).toBe(403);
    expect(response.body.status).toBe(403);
    expect(response.body.message).toBe('Error Creating User');
  });
});

describe('signin auth router', () => {
  let data = {
    username: 'wesam',
    password: 'mypassword',
  };

  let encodedCredentials = base64.encode(`${data.username}:${data.password}`);
  let authHeader = `Basic ${encodedCredentials}`;

  beforeAll(async () => {
    //creating user
    await request.post('/signin').send(data);
  });

  it('should singin the user succesfully', async () => {
    //act
    const response = await request
      .post('/signin')
      .set('Authorization', authHeader);
    //assert
    expect(response.status).toBe(200);
    expect(response.body.user._id.length).toBeGreaterThan(0);
    expect(response.body.user.password.length).toBeGreaterThan(0);
    expect(response.body.user.username).toBe(data.username);
  });

  it('should return a 403 status error code on invalid login', async () => {
    //arrange
    encodedCredentials = base64.encode(`${data.username}:incorrectpassword`);
    authHeader = `Basic ${encodedCredentials}`;
    //act
    const response = await request
      .post('/signin')
      .set('Authorization', authHeader);
    //assert
    expect(response.status).toBe(403);
    expect(response.body.status).toBe(403);
    expect(response.body.message).toBe('Invalid Login');
  });
});
