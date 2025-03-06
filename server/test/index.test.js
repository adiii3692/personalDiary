const request = require('supertest');
const app = require('../index.js');

describe('API GET Endpoint Testing', () => {
  it('should return 200 for GET /recipes', async () => {
    const res = await request(app).get('/recipes');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('recipes');
  });

  it('should return 200 for GET /wishlist', async () => {
    const res = await request(app).get('/wishlist');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('wishlist');
  });
});
