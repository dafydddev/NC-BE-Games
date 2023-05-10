const request = require("supertest");
const app = require("../app.js");
const connection = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");

beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  return connection.end();
});

describe("GET /api/users", () => {
  test("GET /api/users should return 200 status code", () => {
    return request(app).get("/api/users").expect(200);
  });
  test("GET /api/users should return an array", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then((response) => {
        expect(Array.isArray(response.body)).toBe(true);
      });
  });
  test("GET /api/users should return an an array of objects with username, name, and avatar_url props", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then((response) => {
        const usersArray = response.body;
        const firstUser = usersArray[0];
        const fistUserKeys = Object.keys(firstUser);
        expect(usersArray.length === 4).toBe(true);
        expect(typeof firstUser).toBe("object");
        expect(fistUserKeys.length).toBe(3);
        expect(Object.hasOwn(firstUser, "username")).toBe(true);
        expect(Object.hasOwn(firstUser, "name")).toBe(true);
        expect(Object.hasOwn(firstUser, "avatar_url")).toBe(true);
      });
  });
});
