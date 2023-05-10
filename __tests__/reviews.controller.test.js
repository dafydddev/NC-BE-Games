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

describe("GET /api/reviews/:review_id", () => {
  test("GET /api/reviews/:review_id should return 200 status code", () => {
    return request(app).get("/api/reviews/1").expect(200);
  });
  test("GET /api/reviews/:review_id should return an object", () => {
    return request(app)
      .get("/api/reviews/1")
      .expect(200)
      .then((response) => {
        expect(typeof response.body).toBe("object");
      });
  });
  test("GET /api/reviews/:review_id should return an object with expected keys", () => {
    return request(app)
      .get("/api/reviews/1")
      .expect(200)
      .then((response) => {
        const review = response.body;
        const reviewKeys = Object.keys(review);
        expect(reviewKeys.length === 9).toBe(true);
        expect(Object.hasOwn(review, "review_id")).toBe(true);
        expect(Object.hasOwn(review, "title")).toBe(true);
        expect(Object.hasOwn(review, "review_body")).toBe(true);
        expect(Object.hasOwn(review, "designer")).toBe(true);
        expect(Object.hasOwn(review, "review_img_url")).toBe(true);
        expect(Object.hasOwn(review, "votes")).toBe(true);
        expect(Object.hasOwn(review, "category")).toBe(true);
        expect(Object.hasOwn(review, "owner")).toBe(true);
        expect(Object.hasOwn(review, "created_at")).toBe(true);
      });
  });
  test("GET /api/reviews/:review_id should output appropriate error messages when passed an invalid id", () => {
    return request(app)
      .get("/api/reviews/sfsjhdg")
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual({ msg: "Bad Request" });
      });
  });
  test("GET /api/reviews/:review_id should output appropriate error messages when passed an id that gives no results", () => {
    return request(app)
      .get("/api/reviews/100")
      .expect(404)
      .then((response) => {
        expect(response.body).toEqual({
          msg: "No review found for review_id: 100",
        });
      });
  });
});
