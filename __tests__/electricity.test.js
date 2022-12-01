/* eslint-disable linebreak-style */

const { describe, expect, test } = require('@jest/globals');
const request = require('supertest');
const app = require('../app');

// Describe the test set
describe('GET electricity endpoint', () => {
  // The test that is being done
  test('should return 200', (done) => {
    request(app)
      .get('/api/electricity') // Endpoint that is being tested
      .expect(200, done); // Verify the expected result and inform that the test is done
  });
  test('should return valid JSON', async () => {
    const response = await request(app)
      .get('/api/electricity')
      .set('Accept', 'application/json');

    expect(response.status).toEqual(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 1,
          month: '2022-01-14T22:00:00.000Z',
          usage: 2345.12,
          cost: 233.33,
          created: '2022-10-28T11:09:40.000Z',
        }),
        expect.objectContaining({
          id: 2,
          month: '2022-02-14T22:00:00.000Z',
          usage: 1923.233,
          cost: 192.22,
          created: '2022-10-28T11:09:40.000Z',
        }),
        expect.objectContaining({
          id: 3,
          month: '2022-03-14T22:00:00.000Z',
          usage: 1523.233,
          cost: 150.22,
          created: '2022-10-28T11:09:40.000Z',
        }),
        expect.objectContaining({
          id: 4,
          month: '2022-04-14T21:00:00.000Z',
          usage: 1023.233,
          cost: 100.22,
          created: '2022-10-28T11:09:40.000Z',
        }),
        expect.objectContaining({
          id: 5,
          month: '2022-05-14T21:00:00.000Z',
          usage: 1242.267,
          cost: 129.56,
          created: '2022-10-28T11:50:44.000Z',
        }),
      ]),
    );
  });
  test('should return 1 invoice', async () => {
    const response = await request(app)
      .get('/api/electricity/1')
      .set('Accept', 'application/json');

    expect(response.status).toEqual(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: 1,
        month: '2022-01-14T22:00:00.000Z',
        usage: 2345.12,
        cost: 233.33,
        created: '2022-10-28T11:09:40.000Z',
      }),
    );
  });

  test('should return 404 and Not Found', async () => {
    const response = await request(app).get('/api/electricity/101');
    expect(response.status).toEqual(404);
    expect(response.body).toContain('Not Found');
  });
});

describe('POST electricity endpoint', () => {
  test('should return 201', (done) => {
    request(app).post('/api/electricity').expect(201, done);
  });
  test('should create a new invoice', async () => {
    const invoice = {
      month: '2022-06-14',
      usage: 1235.12,
      cost: 1233.33,
    };

    const response = await request(app)
      .post('/api/electricity')
      .set('Accept', 'application/json')
      .send(invoice);

    expect(response.status).toEqual(201);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body.id).toBeTruthy();
    expect(response.body.month).toEqual('2022-06-14');
    expect(response.body.usage).toEqual(1235.12);
    expect(response.body.cost).toEqual(1233.33);
  });
});

describe('DELETE electricity endpoint', () => {
  test('should delete the invoice by id', async () => {
    const invoice = {
      month: '2022-01-14T22:00:00.000Z',
      usage: 2345.12,
      cost: 233.33,
      created: '2022-10-28T11:09:40.000Z',
    };
    const postResponse = await request(app)
      .post('/api/electricity')
      .set('Accept', 'application/json')
      .send(invoice);
    const postId = postResponse.body.id;

    const response = await request(app)
      .delete(`/api/electricity/${postId}`)
      .set('Accept', 'application/json');
    expect(response.status).toEqual(200);
    expect(response.text).toEqual('Invoice deleted');
  });
});
