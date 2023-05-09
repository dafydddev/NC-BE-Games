const request = require('supertest');
const app = require('../app.js');

describe('GET /api', () => {
    test('GET /api should return 200 status code', () => {
        return request(app)
        .get('/api')
        .expect(200);
    });
    test('GET /api should return okay message', () => {
        return request(app)
        .get('/api')
        .expect(200)
        .then((res) => {
            expect(res.body).toEqual({message: 'All Ok'});
        });
    });
});
describe('GET /api/ non-existent endpoint', () => {
    test('GET /api/{non-existent endpoint} should return 404 status code', () => {
        return request(app)
        .get('/api/sdfjksfjl')
        .expect(404);
    });
    test('GET /api/{non-existent endpoint} should return an error message', () => {
        return request(app)
        .get('/api/dfkjsdjlksd')
        .expect(404)
        .then((res) => {
            expect(res.body).toEqual({message: 'Endpoint Not Found'});
        });
    });
});