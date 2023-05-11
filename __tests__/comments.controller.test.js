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
describe('POST /api/reviews/:review_id/comments', () => {
  test("POST /api/reviews/:review_id/comments should return 201 status code", () => {
    const validComment = {
      "username": "mallionaire",
      "body": "blah"
    }
    return request(app)
    .post('/api/reviews/1/comments')
    .send(validComment)
    .expect(201);
  });
  test("POST /api/reviews/:review_id/comments should return an object with body key and string value", () => {
    const validComment = {
      "username": "mallionaire",
      "body": "blah"
    }
    return request(app)
    .post('/api/reviews/1/comments')
    .send(validComment)
    .expect(201).then((returnedComment) => {
      const commentObject = returnedComment.body;
      const commentKeys = Object.keys(commentObject);
      expect(typeof commentObject).toBe('object');
      expect(commentKeys.length).toBe(1);
      expect(Object.hasOwn(commentObject, 'body')).toBe(true);
      expect(typeof commentObject.body).toBe('string');
      expect(commentObject.body).toBe(validComment.body);
    });
  });
  test("POST /api/reviews/:review_id/comments should output appropriate error messages when not passed username", () => {
    const noUsername = {
      "body": "blah"
    }
    return request(app)
    .post('/api/reviews/1/comments')
    .send(noUsername)
    .expect(400).then((returnedError) => {
      expect(returnedError.body).toEqual({ msg: "username and body are required" });
    });
  });
  test("POST /api/reviews/:review_id/comments should output appropriate error messages when not passed body", () => {
    const noBody = {
      "username": "mallionaire"
    }
    return request(app)
    .post('/api/reviews/1/comments')
    .send(noBody)
    .expect(400).then((returnedError) => {
      expect(returnedError.body).toEqual({ msg: "username and body are required" });
    });
  });
  test("POST /api/reviews/:review_id/comments should output appropriate error messages when passed username not in database", () => {
    const badUsername = {
      "username": "iDoNotExistInTheTestDatabase",
      "body": "blah"
    }
    return request(app)
    .post('/api/reviews/1/comments')
    .send(badUsername)
    .expect(400).then((returnedError) => {
      expect(returnedError.body).toEqual({ msg: "Bad Request" });
    });
  });
});
describe('DELETE /api/comments/:comment_id', () => {
  test("DELETE /api/comments/:comment_id should return 204 status code", () => {
    return request(app)
    .delete('/api/comments/1')
    .expect(204);
  });
  test("DELETE /api/comments/:comment_id should not return anything", () => {
    return request(app)
    .delete('/api/comments/1')
    .expect(204)
    .then((returnedData) => {
      expect(returnedData === undefined);
    });
  });
  test("DELETE /api/comments/:comment_id should not return anything", () => {
    return request(app)
    .delete('/api/comments/1')
    .expect(204)
    .then((returnedData) => {
      expect(returnedData === undefined);
    });
  });
  test("DELETE /api/comments/:comment_id should output appropriate error messages when passed an invalid id", () => {
    return request(app)
    .delete('/api/comments/adfhjsdf')
    .expect(400).then((returnedError) => {
      expect(returnedError.body).toEqual({ msg: "Bad Request" });
    });
  });
  test("DELETE /api/comments/:comment_id should output appropriate error messages an id that does not exist", () => {
    return request(app)
    .delete('/api/comments/100')
    .expect(404).then((returnedError) => {
      expect(returnedError.body).toEqual({ msg: "No comments found for comment_id: 100" });
    });
  });
});