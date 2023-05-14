const request = require("supertest");
const app = require("../app.js");
const connection = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");

beforeEach(() => seed(testData));

afterAll(() => connection.end());

describe("GET /api/categories", () => {
  test("GET /api/categories should return 200 status code", () => {
    return request(app).get("/api/categories").expect(200);
  });
  test("GET /api/categories should return an array", () => {
    return request(app)
      .get("/api/categories")
      .expect(200)
      .then((response) => {
        expect(Array.isArray(response.body)).toBe(true);
      });
  });
  test("GET /api/categories should return an an array of objects with slug and description props", () => {
    return request(app)
      .get("/api/categories")
      .expect(200)
      .then((response) => {
        const categoryArray = response.body;
        const firstCategory = categoryArray[0];
        const fistCategoryKeys = Object.keys(firstCategory);
        expect(categoryArray.length === 4).toBe(true);
        expect(typeof firstCategory).toBe("object");
        expect(fistCategoryKeys.length).toBe(2);
        expect(Object.hasOwn(firstCategory, "slug")).toBe(true);
        expect(Object.hasOwn(firstCategory, "description")).toBe(true);
      });
  });
});
