const request = require('supertest');

const app = require('../src/index');

const ip = '207.97.227.239';

const _testSuccessResponseBody = (res) => {
  expect(res.body).toEqual(
    expect.objectContaining({
      ip,
      range: expect.arrayContaining([expect.any(Number), expect.any(Number)]),
      country: 'US',
      region: expect.any(String),
      eu: expect.any(String),
      timezone: expect.any(String),
      city: expect.any(String),
      ll: expect.arrayContaining([expect.any(Number), expect.any(Number)]),
      metro: expect.any(Number),
      area: expect.any(Number),
    }),
  );
};

const _testSuccessHtmlResponse = (res) => {
  expect(res.text).toContain('<!DOCTYPE html>');
  expect(res.text).toContain('<title>Micro GeoIP Lite');
  expect(res.text).toContain('<h2>Details</h2>');
  expect(res.text).toContain('<h2>Raw JSON Data</h2>');
  expect(res.text).toContain(`<strong>ip:</strong> ${ip}`);
  expect(res.text).toContain('<strong>country:</strong> US');
};

const _testErrorHtmlResponse = (res, errorMessage) => {
  expect(res.text).toContain('<!DOCTYPE html>');
  expect(res.text).toContain('<h2>Error</h2>');
  expect(res.text).toContain('class="error-container"');
  expect(res.text).toContain(errorMessage);
  expect(res.text).toContain('Examples of valid IPs:');
};

describe('API Endpoints', () => {
  describe('JSON responses (default)', () => {
    it('should return 500 if ip not found', async () => {
      const res = await request(app).get('/');
      expect(res.statusCode).toEqual(500);
      expect(res.body.error).toEqual(expect.any(String));
      expect(res.headers['content-type']).toContain('application/json');
    });

    it('should get IP data on root route from request ip', async () => {
      const res = await request(app).get('/').set('X-Forwarded-For', ip);
      expect(res.statusCode).toEqual(200);
      expect(res.headers['content-type']).toContain('application/json');
      _testSuccessResponseBody(res);
    });

    it('should get IP data on root route when param is passed', async () => {
      const res = await request(app).get('/').query({ ip });
      expect(res.statusCode).toEqual(200);
      expect(res.headers['content-type']).toContain('application/json');
      _testSuccessResponseBody(res);
    });

    it('should return 400 if invalid ip', async () => {
      const res = await request(app).get('/').query({ ip: 'invalid-ip' });
      expect(res.statusCode).toEqual(400);
      expect(res.headers['content-type']).toContain('application/json');
      expect(res.body.error.includes('valid')).toBe(true);
    });

    it('should handle timeout parameter', async () => {
      const res = await request(app).get('/').query({ ip, timeout: 1000 });
      expect(res.statusCode).toEqual(200);
      expect(res.headers['content-type']).toContain('application/json');
      _testSuccessResponseBody(res);
    });

    it('should enforce minimum timeout', async () => {
      const res = await request(app).get('/').query({ ip, timeout: 100 });
      expect(res.statusCode).toEqual(200);
      expect(res.headers['content-type']).toContain('application/json');
      _testSuccessResponseBody(res);
    });

    it('should enforce maximum timeout', async () => {
      const res = await request(app).get('/').query({ ip, timeout: 20000 });
      expect(res.statusCode).toEqual(200);
      expect(res.headers['content-type']).toContain('application/json');
      _testSuccessResponseBody(res);
    });
  });

  describe('HTML responses', () => {
    it('should return HTML when Accept header includes text/html', async () => {
      const res = await request(app)
        .get('/')
        .set('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8')
        .query({ ip });
      
      expect(res.statusCode).toEqual(200);
      expect(res.headers['content-type']).toContain('text/html');
      _testSuccessHtmlResponse(res);
    });

    it('should return HTML error page for invalid IP', async () => {
      const res = await request(app)
        .get('/')
        .set('Accept', 'text/html')
        .query({ ip: 'invalid-ip' });
      
      expect(res.statusCode).toEqual(400);
      expect(res.headers['content-type']).toContain('text/html');
      _testErrorHtmlResponse(res, 'Please only submit valid IPs');
    });

    it('should return HTML error page when no IP found', async () => {
      const res = await request(app)
        .get('/')
        .set('Accept', 'text/html');
      
      expect(res.statusCode).toEqual(500);
      expect(res.headers['content-type']).toContain('text/html');
      expect(res.text).toContain('<h2>Error</h2>');
      expect(res.text).toContain('class="error-container"');
    });

    it('should include mobile ad container in HTML response', async () => {
      const res = await request(app)
        .get('/')
        .set('Accept', 'text/html')
        .query({ ip });
      
      expect(res.statusCode).toEqual(200);
      expect(res.text).toContain('id="mobile-ad-container"');
      expect(res.text).toContain('class="mobile-ad"');
    });

    it('should include AdSense scripts in HTML response', async () => {
      const res = await request(app)
        .get('/')
        .set('Accept', 'text/html')
        .query({ ip });
      
      expect(res.statusCode).toEqual(200);
      expect(res.text).toContain('pagead2.googlesyndication.com');
      expect(res.text).toContain('data-ad-client="ca-pub-5266987079964279"');
      expect(res.text).toContain('window.adsbygoogle.push({})');
    });

    it('should include SEO content in HTML response', async () => {
      const res = await request(app)
        .get('/')
        .set('Accept', 'text/html')
        .query({ ip });
      
      expect(res.statusCode).toEqual(200);
      expect(res.text).toContain('class="seo-content"');
      expect(res.text).toContain('Free & Open Source IP Geolocation API');
      expect(res.text).toContain('npm install micro-geoip-lite');
    });
  });

  describe('CORS headers', () => {
    it('should include CORS headers in JSON response', async () => {
      const res = await request(app).get('/').query({ ip });
      
      expect(res.headers['access-control-allow-origin']).toBe('*');
      expect(res.headers['access-control-allow-methods']).toContain('GET');
      expect(res.headers['access-control-allow-headers']).toContain('Content-Type');
    });

    it('should include CORS headers in HTML response', async () => {
      const res = await request(app)
        .get('/')
        .set('Accept', 'text/html')
        .query({ ip });
      
      expect(res.headers['access-control-allow-origin']).toBe('*');
      expect(res.headers['access-control-allow-methods']).toContain('GET');
      expect(res.headers['access-control-allow-headers']).toContain('Content-Type');
    });
  });

  describe('Edge cases', () => {
    it('should handle IPv6 addresses', async () => {
      const ipv6 = '2001:4860:4860::8888'; // Google's IPv6 DNS
      const res = await request(app).get('/').query({ ip: ipv6 });
      
      // IPv6 might not have geolocation data, but should not error on IP validation
      expect([200, 500]).toContain(res.statusCode);
      if (res.statusCode === 200) {
        expect(res.body.ip).toBe(ipv6);
      }
    });

    it('should handle private IP addresses', async () => {
      const privateIp = '192.168.1.1';
      const res = await request(app).get('/').query({ ip: privateIp });
      
      // Private IPs typically don't have geolocation data
      expect(res.statusCode).toEqual(500);
      expect(res.body.error).toEqual(expect.any(String));
    });

    it('should handle localhost IP', async () => {
      const localhostIp = '127.0.0.1';
      const res = await request(app).get('/').query({ ip: localhostIp });
      
      expect(res.statusCode).toEqual(500);
      expect(res.body.error).toEqual(expect.any(String));
    });

    it('should handle malformed IP addresses', async () => {
      const malformedIps = ['999.999.999.999', '192.168.1', '192.168.1.1.1', 'not-an-ip'];
      
      for (const malformedIp of malformedIps) {
        const res = await request(app).get('/').query({ ip: malformedIp });
        expect(res.statusCode).toEqual(400);
        expect(res.body.error).toContain('valid');
      }
    });
  });
});
