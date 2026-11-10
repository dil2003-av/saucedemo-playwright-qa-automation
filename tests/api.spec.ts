
import { test, expect } from '@playwright/test';

const API_URL = 'https://jsonplaceholder.typicode.com';

test.describe('API Automation Tests', () => {

  test('TC_API_001 - Verify GET all posts API', async ({ request }) => {

    const response = await request.get(`${API_URL}/posts`);

    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();

  });

  test('TC_API_002 - Verify all posts response data', async ({ request }) => {

    const response = await request.get(`${API_URL}/posts`);
    const posts = await response.json();

    expect(Array.isArray(posts)).toBeTruthy();
    expect(posts.length).toBe(100);

  });

  test('TC_API_003 - Verify GET single post API', async ({ request }) => {

    const response = await request.get(`${API_URL}/posts/1`);

    expect(response.status()).toBe(200);

    const post = await response.json();

    expect(post.id).toBe(1);

  });

  test('TC_API_004 - Verify single post response body', async ({ request }) => {

    const response = await request.get(`${API_URL}/posts/1`);
    const post = await response.json();

    expect(post).toMatchObject({
      userId: 1,
      id: 1
    });

    expect(post.title).toBeTruthy();
    expect(post.body).toBeTruthy();

  });

  test('TC_API_005 - Verify POST create new post API', async ({ request }) => {

    const newPost = {
      title: 'Playwright API Testing',
      body: 'Testing POST request using Playwright',
      userId: 1
    };

    const response = await request.post(`${API_URL}/posts`, {
      data: newPost
    });

    expect(response.status()).toBe(201);

    const responseBody = await response.json();

    expect(responseBody).toMatchObject(newPost);
    expect(responseBody.id).toBeTruthy();

  });

  test('TC_API_006 - Verify PUT update post API', async ({ request }) => {

    const updatedPost = {
      id: 1,
      title: 'Updated API Testing Post',
      body: 'Updated using PUT request',
      userId: 1
    };

    const response = await request.put(`${API_URL}/posts/1`, {
      data: updatedPost
    });

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody.title).toBe(updatedPost.title);
    expect(responseBody.body).toBe(updatedPost.body);

  });

  test('TC_API_007 - Verify PATCH update post API', async ({ request }) => {

    const updatedData = {
      title: 'Partially Updated Post'
    };

    const response = await request.patch(`${API_URL}/posts/1`, {
      data: updatedData
    });

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody.title).toBe(updatedData.title);

  });

  test('TC_API_008 - Verify DELETE post API', async ({ request }) => {

    const response = await request.delete(`${API_URL}/posts/1`);

    expect(response.status()).toBe(200);

  });

  test('TC_API_009 - Verify invalid API endpoint', async ({ request }) => {

    const response = await request.get(`${API_URL}/invalid-endpoint`);

    expect(response.status()).toBe(404);

  });

  test('TC_API_010 - Verify API response time', async ({ request }) => {

    const startTime = Date.now();

    const response = await request.get(`${API_URL}/posts/1`);

    const responseTime = Date.now() - startTime;

    expect(response.status()).toBe(200);
    expect(responseTime).toBeLessThan(10000);

    console.log(`API Response Time: ${responseTime} ms`);

  });

});
