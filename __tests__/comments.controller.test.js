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

describe("GET /api/reviews/:review_id/comments", () => {
  test("GET /api/reviews/:review_id/comments should return 200 status code", () => {
    return request(app).get("/api/reviews/2/comments").expect(200);
  });
  test("GET /api/reviews/:review_id/comments should return an array", () => {
    return request(app)
      .get("/api/reviews/2/comments")
      .expect(200)
      .then((response) => {
        expect(Array.isArray(response.body)).toBe(true);
      });
  });
  test("GET /api/reviews/:review_id/comments should return an object with expected keys", () => {
    return request(app)
      .get("/api/reviews/2/comments")
      .expect(200)
      .then((response) => {
        const comments = response.body;
        const correctProps = comments.every(comment => {
            return Object.keys(comment).length === 6 &&
            Object.hasOwn(comment, 'comment_id') &&
            Object.hasOwn(comment, 'body') &&
            Object.hasOwn(comment, 'review_id') &&
            Object.hasOwn(comment, 'author') &&
            Object.hasOwn(comment, 'votes') &&
            Object.hasOwn(comment, 'created_at');
        })
        expect(correctProps).toBe(true);
      });
  });
  test('"GET /api/reviews/:review_id/comments should return an array sorted by the date', () => {
    return request(app)
      .get("/api/reviews/2/comments")
      .expect(200)
      .then((response) => {
        expect(response.body).toBeSorted({ key: 'created_at', descending: true });
      });
  });
  test("GET /api/reviews/:review_id/comments should output appropriate error messages when passed an invalid id", () => {
    return request(app)
      .get("/api/reviews/sfsjhdg/comments")
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual({ msg: "Bad Request" });
      });
  });
  test("GET /api/reviews/:review_id/comments should output appropriate error messages when passed an existing review that has no comments", () => {
    return request(app)
      .get("/api/reviews/1/comments")
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual({
          msg: "No comments found for review_id: 1",
        });
      });
  });
});