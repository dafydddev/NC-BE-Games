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

describe("GET /api/reviews", () => {
  test("GET /api/reviews should return 200 status code", () => {
    return request(app).get("/api/reviews").expect(200);
  });
  test("GET /api/reviews should return an array", () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then((response) => {
        expect(Array.isArray(response.body)).toBe(true);
      });
  });
  test("GET /api/reviews should return an an array of objects with the correct props", () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then((response) => {
        const reviewArray = response.body;
        const firstReview = reviewArray[0];
        const fistReviewKeys = Object.keys(firstReview);
        expect(reviewArray.length === 13).toBe(true);
        expect(typeof firstReview).toBe("object");
        expect(fistReviewKeys.length).toBe(9);
        expect(Object.hasOwn(firstReview, "owner")).toBe(true);
        expect(Object.hasOwn(firstReview, "title")).toBe(true);
        expect(Object.hasOwn(firstReview, "review_id")).toBe(true);
        expect(Object.hasOwn(firstReview, "category")).toBe(true);
        expect(Object.hasOwn(firstReview, "review_img_url")).toBe(true);
        expect(Object.hasOwn(firstReview, "created_at")).toBe(true);
        expect(Object.hasOwn(firstReview, "votes")).toBe(true);
        expect(Object.hasOwn(firstReview, "designer")).toBe(true);
        expect(Object.hasOwn(firstReview, "comment_count")).toBe(true);
      });
  });
  test('"GET /api/reviews should return an an array sorted by the date', () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then((response) => {
        expect(response.body).toBeSorted({
          key: "created_at",
          descending: true,
        });
      });
  });
  test('"GET /api/reviews comment count should be accurate', () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then((response) => {
        const exampleFromTestDataWithNoComments = response.body[0];
        const exampleFromTestDataWithComments = response.body[4];
        expect(exampleFromTestDataWithNoComments.comment_count).toBe(0);
        expect(exampleFromTestDataWithComments.comment_count).toBe(3);
      });
  });
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
describe("PATCH /api/reviews/:review_id", () => {
  test("PATCH /api/reviews/:review_id should return 200 status code", () => {
    validVotes = {
      inc_votes: 1
    };
    return request(app)
      .patch("/api/reviews/1")
      .send(validVotes)
      .expect(200);
  });
  test("PATCH /api/reviews/:review_id should return the updated review", () => {
    validVotes = {
      inc_votes: 1
    };
    expectedOutcome = {
      review_id: 1,
      title: 'Agricola',
      designer: 'Uwe Rosenberg',
      owner: 'mallionaire',
      review_img_url:
        'https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?w=700&h=700',
      review_body: 'Farmyard fun!',
      category: 'euro game',
      created_at: '2021-01-18T10:00:20.514Z',
      votes: 2
    }
    return request(app)
      .patch("/api/reviews/1")
      .send(validVotes)
      .expect(200)
      .then((returnedReturn) => {
        expect(returnedReturn.body).toEqual(expectedOutcome);
      })
  });
  test("PATCH /api/reviews/:review_id should increment the votes when passed a positive number", () => {
    validVotes = {
      inc_votes: 1
    };
    expectedOutcome = {
      review_id: 1,
      title: 'Agricola',
      designer: 'Uwe Rosenberg',
      owner: 'mallionaire',
      review_img_url:
        'https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?w=700&h=700',
      review_body: 'Farmyard fun!',
      category: 'euro game',
      created_at: '2021-01-18T10:00:20.514Z',
      votes: 2
    }
    return request(app)
      .patch("/api/reviews/1")
      .send(validVotes)
      .expect(200)
      .then((returnedReturn) => {
        expect(returnedReturn.body).toEqual(expectedOutcome);
      })
  });
  test("PATCH /api/reviews/:review_id should decrement the votes when passed a negative number", () => {
    validVotes = {
      inc_votes: -1
    };
    expectedOutcome = {
      review_id: 1,
      title: 'Agricola',
      designer: 'Uwe Rosenberg',
      owner: 'mallionaire',
      review_img_url:
        'https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?w=700&h=700',
      review_body: 'Farmyard fun!',
      category: 'euro game',
      created_at: '2021-01-18T10:00:20.514Z',
      votes: 0
    }
    return request(app)
      .patch("/api/reviews/1")
      .send(validVotes)
      .expect(200)
      .then((returnedReturn) => {
        expect(returnedReturn.body).toEqual(expectedOutcome);
      })
  });
  test("PATCH /api/reviews/:review_id should support decrementing the votes below 0", () => {
    validVotes = {
      inc_votes: -2
    };
    expectedOutcome = {
      review_id: 1,
      title: 'Agricola',
      designer: 'Uwe Rosenberg',
      owner: 'mallionaire',
      review_img_url:
        'https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?w=700&h=700',
      review_body: 'Farmyard fun!',
      category: 'euro game',
      created_at: '2021-01-18T10:00:20.514Z',
      votes: -1
    }
    return request(app)
      .patch("/api/reviews/1")
      .send(validVotes)
      .expect(200)
      .then((returnedReturn) => {
        expect(returnedReturn.body).toEqual(expectedOutcome);
      })
  });
  test("PATCH /api/reviews/:review_id should output appropriate error messages when passed object without inc_votes key", () => {
    emptyObject = {
    };
    return request(app)
      .patch("/api/reviews/1")
      .send(emptyObject)
      .expect(400)
      .then((returnedError) => {
        expect(returnedError.body).toEqual({ msg: "inc_votes is required" });
      })
  });
  test("PATCH /api/reviews/:review_id should output appropriate error messages when passed object with invalid inc_votes key", () => {
    invalidVotes = {
      inc_votes: "hello"
    };
    return request(app)
      .patch("/api/reviews/1")
      .send(invalidVotes)
      .expect(400)
      .then((returnedError) => {
        expect(returnedError.body).toEqual({ msg: "Bad Request" });
      })
  });
});
