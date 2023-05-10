const request = require("supertest");
const app = require("../app.js");

describe("GET /api/ non-existent endpoint", () => {
  test("GET /api/{non-existent endpoint} should return 404 status code", () => {
    return request(app).get("/api/sdfjksfjl").expect(404);
  });
  test("GET /api/{non-existent endpoint} should return an error message", () => {
    return request(app)
      .get("/api/dfkjsdjlksd")
      .expect(404)
      .then((res) => {
        expect(res.body).toEqual({ message: "Endpoint Not Found" });
      });
  });
});
