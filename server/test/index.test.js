const request = require('supertest');
const app = require('../index.js');
require('dotenv').config()

//Test Vars
const sampleUserId = process.env.sampleUserId
let entrieId = 1
let recipeId = 1
let wishlistId = 1

//  GET API Endpoint Testing
describe('API GET Endpoint Testing', () => {
  // GET recipes
  it('should return 200 for GET /recipes', async () => {
    const res = await request(app).get('/recipes');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('recipes');
  });

  // GET wishlist
  it('should return 200 for GET /wishlist', async () => {
    const res = await request(app).get('/wishlist');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('wishlist');
  });

  // GET entries
  it('should return 200 for GET /entries', async () => {
    const res = await request(app).get('/entries');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('entries');
  });
});

//  POST API Endpoint Testing
describe('API POST Endpoint Testing', () => {
  // POST recipes
  it('should return 200 for POST /recipes', async () => {
    const res = await request(app)
      .post(`/recipes/${sampleUserId}`)
      .send({
        title:  "Test Title",
        content:  "# Test Content",
        description: "Test Description",
      });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('createdRecipe');
    recipeId = res.body.createdRecipe.id;
  });

  // POST wishlist
  it('should return 200 for POST /wishlist', async () => {
    const res = await request(app)
      .post(`/wishlist/${sampleUserId}`)
      .send({
        title:  "Test Title",
        content:  "# Test Content",
        description: "Test Description",
        imageUrl: "Test Image Url"
      });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('createdWishlist');
    wishlistId = res.body.createdWishlist.id;
  });

  // POST Entrie
  it('should return 200 for POST /entries', async () => {
    const res = await request(app)
      .post(`/entries/${sampleUserId}`)
      .send({
        title:  "Test Title",
        content:  "# Test Content",
        imageUrl: "Test Image Url"
      });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('createdEntrie');
    entrieId = res.body.createdEntrie.id;
  });
})

// PUT API Endpoint Testing
describe('API PUT Endpoint Testing', () => {
  // PUT Recipes
  it('should return 200 for PUT /recipes', async () => {
    const res = await request(app)
      .put(`/recipes/${recipeId}/${sampleUserId}`)
      .send({
        title:  "Updated Test Title",
        content:  "# Updated Test Content",
        description: "Updated Test Description",
      });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('updatedRecipe');
  });

  // PUT Wishlist
  it('should return 200 for PUT /wishlist', async () => {
    const res = await request(app)
      .put(`/wishlist/${wishlistId}/${sampleUserId}`)
      .send({
        title:  "Updated Test Title",
        content:  "# Updated Test Content",
        description: "Updated Test Description",
        imageUrl: "Updated Image URL"
      });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('updatedWishlist');
  });

    // PUT Entrie
    it('should return 200 for PUT /entrie', async () => {
      const res = await request(app)
        .put(`/entries/${entrieId}/${sampleUserId}`)
        .send({
          title:  "Updated Test Title",
          content:  "# Updated Test Content",
          imageUrl: "Updated Image URL"
        });
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('updatedEntrie');
    });
})

// DELETE API Endpoint Testing
describe('API DELETE Endpoint Testing', () => {
  // Delete recipes
  it('should return 200 for DELETE /recipes', async () => {
    const res = await request(app)
      .delete(`/recipes/${recipeId}/${sampleUserId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('deletedRecipe');
  });

  // Delete wishlist
  it('should return 200 for DELETE /wishlist', async () => {
    const res = await request(app)
      .delete(`/wishlist/${wishlistId}/${sampleUserId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('deletedWishlist');
  });

  // Delete entrie
  it('should return 200 for DELETE /entries', async () => {
    const res = await request(app)
      .delete(`/entries/${entrieId}/${sampleUserId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('deletedEntrie');
  });
})