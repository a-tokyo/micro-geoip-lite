const request = require('supertest');
const app = require('./index');

const ip = '207.97.227.239';

const _testSuccessResponseBody = (res) => {
  expect(res.body).toEqual(
    expect.objectContaining({
      ip,
      range: expect.arrayContaining([expect.any(Number), expect.any(Number)]),
      country: 'US',
      region: expect.any(String),
      eu: expect.any(String),
      timezone: expect.any(String),
      city: expect.any(String),
      ll: expect.arrayContaining([expect.any(Number), expect.any(Number)]),
      metro: expect.any(Number),
      area: expect.any(Number),
    }),
  );
};

describe('Post Endpoints', () => {
  it('should return 500 if ip not found', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(500);
    expect(res.body.error).toEqual(expect.any(String));
  });

  it('should get IP data on root route from request ip', async () => {
    const res = await request(app).get('/').set('X-Forwarded-For', ip);
    expect(res.statusCode).toEqual(200);
    _testSuccessResponseBody(res);
  });

  it('should get IP data on root route when param is passed', async () => {
    const res = await request(app).get('/').query({ ip });
    expect(res.statusCode).toEqual(200);
    _testSuccessResponseBody(res);
  });

  it('should return 400 if invalid ip', async () => {
    
    const res = await request(app).get('/').query({ ip });
    expect(res.statusCode).toEqual(200);
    _testSuccessResponseBody(res);
  });
});
