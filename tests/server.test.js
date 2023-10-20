const request = require('supertest');
const express = require('express');
const app = require('../server');

describe('Express App Tests', () => {
  let server;

  beforeAll(() => {
    server = app.listen(3000);
  });

  afterAll((done) => {
    server.close(done);
  });

  it('responds to the root URL with login.html', async () => {
    const response = await request(server).get('/');
    expect(response.status).toBe(200);
    expect(response.type).toBe('text/html');
    expect(response.text).toContain('login.html');
  });

  it('auth/github route redirects to GitHub authentication', async () => {
    const response = await request(server).get('/auth/github');
    expect(response.status).toBe(302);
    expect(response.header.location).toContain('github.com/login/oauth');
  });

  it('github/callback route redirects to /api-docs upon successful GitHub authentication', async () => {
    const response = await request(server).get('/github/callback');
    expect(response.status).toBe(302);
    expect(response.header.location).toBe('/api-docs');
  });

});
