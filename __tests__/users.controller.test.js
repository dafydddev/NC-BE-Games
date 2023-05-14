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
        expect(usersArray.length).toBe(4);
        expect(expectedObjects).toBe(true);
      });
  });
});
describe("GET /api/users/:username", () => {
  test("GET /api/users/:username should return 200 status code with a valid username", () => {
    return request(app).get("/api/users/mallionaire").expect(200);
  });
  test("GET /api/users/:username should return an object with a valid username", () => {
    return request(app)
      .get("/api/users/mallionaire")
      .expect(200)
      .then((response) => {
        expect(typeof response.body).toBe("object");
      });
  });
  test("GET /api/users/:username should return an object with username, avatar_url, and name keys", () => {
    return request(app)
      .get("/api/users/mallionaire")
      .expect(200)
      .then((response) => {
        const user = response.body;
        const userKeys = Object.keys(user);
        expect(userKeys.length).toBe(3);
        expect(Object.hasOwn(user, "username")).toBe(true);
        expect(Object.hasOwn(user, "avatar_url")).toBe(true);
        expect(Object.hasOwn(user, "name")).toBe(true);
      });
  });
  test("GET /api/users/:username should output appropriate error messages when passed a username that gives no results ", () => {
    return request(app)
      .get("/api/users/thisUserIsNotInTheTestDatabase")
      .expect(404)
      .then((response) => {
        expect(response.body).toEqual({
          msg: "No user found for username: thisUserIsNotInTheTestDatabase",
        });
      });
  });
});
