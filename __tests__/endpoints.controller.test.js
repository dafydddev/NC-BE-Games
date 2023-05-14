const request = require("supertest");
const app = require("../app.js");
const connection = require("../db/connection.js");
const endpointJSON = require("../endpoints.json");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");

beforeEach(() => seed(testData));

afterAll(() => connection.end());

describe("GET /api", () => {
  test("GET /api should return 200 status code", () => {
    return request(app).get("/api").expect(200);
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
        expect(endpointObject).toEqual(endpointJSON);
      });
  });
});