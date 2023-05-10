const request = require("supertest");
const app = require("../app.js");
const connection = require("../db/connection.js");

afterAll(() => {
  return connection.end();
});

describe("GET /api", () => {
  test("GET /api should return 200 status code", () => {
    return request(app).get("/api/categories").expect(200);
  });

  test("GET /api should return an object", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((response) => {
        expect(typeof response.body).toBe('object');
      });
  });
  test("GET /api should return an object the current endpoints", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((response) => {
        const endpointObject = response.body;
        const endpointKeys = Object.keys(endpointObject);
        expect(endpointKeys.length === 3).toBe(true);
        expect(Object.hasOwn(endpointObject, 'GET /api')).toBe(true);
        expect(Object.hasOwn(endpointObject, 'GET /api/categories')).toBe(true);
        expect(Object.hasOwn(endpointObject, 'GET /api/reviews/:review_id')).toBe(true);
      });
  });
});
