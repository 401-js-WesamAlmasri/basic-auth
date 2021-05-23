'use strict';

const supergoose = require('@code-fellows/supergoose');
const server = require('../src/server');
const request = supergoose(server.app);

describe('404 not found error', () => {
  //arrange
  const errorObj = {
    status: 404,
    message: 'Not Found',
  };

  it('should return 404 status error ', async () => {
    //asct
    const response = await request.get('/foo');
    //assert
    expect(response.status).toBe(404);
    expect(response.body).toEqual(errorObj);
  });

  it('should return 404 status error ', async () => {
    //act
    const response = await request.get('/signin');
    //assert
    expect(response.status).toBe(404);
    expect(response.body).toEqual(errorObj);
  });
});
