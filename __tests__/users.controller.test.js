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
        expect(Array.isArray(response.body.users)).toBe(true);
      });
  });
  test("GET /api/users should return an an array of objects with username, name, and avatar_url props", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then((response) => {
        const usersArray = response.body.users;
        const expectedObjects = usersArray.every((user) => {
          const userKeys = Object.keys(user);
          return (
            userKeys.length === 3 &&
            Object.hasOwn(user, "username") &&
            Object.hasOwn(user, "name") &&
            Object.hasOwn(user, "avatar_url")
          );
        });
        expect(usersArray.length).toBe(4)
        expect(expectedObjects).toBe(true);
      });
  });
});
