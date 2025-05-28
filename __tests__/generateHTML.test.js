const generateHTML = require('../src/generateHTML');

describe('generateHTML', () => {
  describe('with valid geolocation data', () => {
    const mockResult = {
      ip: '207.97.227.239',
      range: [3479299072, 3479299327],
      country: 'US',
      region: 'NY',
      eu: '0',
      timezone: 'America/New_York',
      city: 'New York',
      ll: [40.7128, -74.0060],
      metro: 501,
      area: 1000,
    };

    it('should generate valid HTML with DOCTYPE', () => {
      const html = generateHTML(mockResult);
      expect(html).toContain('<!DOCTYPE html>');
      expect(html).toContain('<html>');
      expect(html).toContain('</html>');
    });

    it('should include proper meta tags', () => {
      const html = generateHTML(mockResult);
      expect(html).toContain('<meta charset="UTF-8"');
      expect(html).toContain('<meta name="viewport"');
      expect(html).toContain('<meta name="author" content="Ahmed Tokyo">');
      expect(html).toContain('<title>Micro GeoIP Lite - Fast, Free and Open Source IP Geolocation Service</title>');
    });

    it('should include Open Graph meta tags', () => {
      const html = generateHTML(mockResult);
      expect(html).toContain('<meta property="og:type" content="website">');
      expect(html).toContain('<meta property="og:title"');
      expect(html).toContain('<meta property="og:description"');
      expect(html).toContain('<meta property="og:image"');
    });

    it('should include Twitter meta tags', () => {
      const html = generateHTML(mockResult);
      expect(html).toContain('<meta property="twitter:card"');
      expect(html).toContain('<meta property="twitter:title"');
      expect(html).toContain('<meta property="twitter:description"');
    });

    it('should display geolocation data in details section', () => {
      const html = generateHTML(mockResult);
      expect(html).toContain('<h2>Details</h2>');
      expect(html).toContain('<strong>ip:</strong> 207.97.227.239');
      expect(html).toContain('<strong>country:</strong> US');
      expect(html).toContain('<strong>city:</strong> New York');
      expect(html).toContain('<strong>timezone:</strong> America/New_York');
    });

    it('should include JSON data section', () => {
      const html = generateHTML(mockResult);
      expect(html).toContain('<h2>Raw JSON Data</h2>');
      expect(html).toContain('class="json-code"');
      expect(html).toContain('"ip": "207.97.227.239"');
      expect(html).toContain('"country": "US"');
    });

    it('should include mobile ad container with ID', () => {
      const html = generateHTML(mockResult);
      expect(html).toContain('id="mobile-ad-container"');
      expect(html).toContain('class="mobile-ad"');
    });

    it('should include desktop ad slot', () => {
      const html = generateHTML(mockResult);
      expect(html).toContain('data-ad-slot="8543379979"');
      expect(html).toContain('data-ad-client="ca-pub-5266987079964279"');
      expect(html).toContain('data-ad-format="auto"');
    });

    it('should include AdSense script', () => {
      const html = generateHTML(mockResult);
      expect(html).toContain('pagead2.googlesyndication.com/pagead/js/adsbygoogle.js');
      expect(html).toContain('client=ca-pub-5266987079964279');
    });

    it('should include mobile ad injection JavaScript', () => {
      const html = generateHTML(mockResult);
      expect(html).toContain('document.addEventListener(\'DOMContentLoaded\'');
      expect(html).toContain('window.innerWidth < 768');
      expect(html).toContain('data-ad-slot="9567852882"');
      expect(html).toContain('window.adsbygoogle.push({})');
    });

    it('should include SEO content section', () => {
      const html = generateHTML(mockResult);
      expect(html).toContain('class="seo-content"');
      expect(html).toContain('Free & Open Source IP Geolocation API');
      expect(html).toContain('Why Choose Micro GeoIP Lite?');
      expect(html).toContain('Perfect for Backend Development');
      expect(html).toContain('Frontend & Client-Side Integration');
    });

    it('should include use cases section', () => {
      const html = generateHTML(mockResult);
      expect(html).toContain('class="use-cases"');
      expect(html).toContain('E-commerce');
      expect(html).toContain('Security');
      expect(html).toContain('Analytics');
      expect(html).toContain('Content');
    });

    it('should include NPM package information', () => {
      const html = generateHTML(mockResult);
      expect(html).toContain('npm install micro-geoip-lite');
      expect(html).toContain('import geodecodeIp from \'micro-geoip-lite\'');
      expect(html).toContain('https://www.npmjs.com/package/micro-geoip-lite');
    });
  });

  describe('with error data', () => {
    const errorResult = {
      error: 'Please only submit valid IPs'
    };

    it('should display error message', () => {
      const html = generateHTML(errorResult);
      expect(html).toContain('<h2>Error</h2>');
      expect(html).toContain('class="error-container"');
      expect(html).toContain('❌ Please only submit valid IPs');
    });

    it('should include error help text', () => {
      const html = generateHTML(errorResult);
      expect(html).toContain('Please check your IP address and try again');
      expect(html).toContain('Examples of valid IPs:');
      expect(html).toContain('8.8.8.8 (Google DNS)');
      expect(html).toContain('1.1.1.1 (Cloudflare DNS)');
    });

    it('should still include JSON data section with error', () => {
      const html = generateHTML(errorResult);
      expect(html).toContain('<h2>Raw JSON Data</h2>');
      expect(html).toContain('"error": "Please only submit valid IPs"');
    });

    it('should still include all meta tags and SEO content', () => {
      const html = generateHTML(errorResult);
      expect(html).toContain('<title>Micro GeoIP Lite');
      expect(html).toContain('class="seo-content"');
      expect(html).toContain('Free & Open Source IP Geolocation API');
    });

    it('should handle error result with additional data properties', () => {
      const errorWithData = {
        error: 'Lookup failed',
        ip: '192.168.1.1',
        attempted: true
      };
      const html = generateHTML(errorWithData);
      expect(html).toContain('<h2>Error</h2>');
      expect(html).toContain('❌ Lookup failed');
      expect(html).toContain('"error": "Lookup failed"');
      expect(html).toContain('"ip": "192.168.1.1"');
      expect(html).toContain('"attempted": true');
    });
  });

  describe('with empty/null data', () => {
    it('should handle null result', () => {
      const html = generateHTML(null);
      expect(html).toContain('class="no-data"');
      expect(html).toContain('No geolocation data available');
    });

    it('should handle empty object', () => {
      const html = generateHTML({});
      expect(html).toContain('class="no-data"');
      expect(html).toContain('No geolocation data available');
    });

    it('should handle undefined result', () => {
      const html = generateHTML(undefined);
      expect(html).toContain('class="no-data"');
      expect(html).toContain('No geolocation data available');
    });
  });

  describe('CSS and styling', () => {
    const mockResult = { ip: '8.8.8.8', country: 'US' };

    it('should include responsive CSS grid', () => {
      const html = generateHTML(mockResult);
      expect(html).toContain('.content-grid');
      expect(html).toContain('grid-template-columns: 1fr');
      expect(html).toContain('@media (min-width: 768px)');
    });

    it('should include mobile ad CSS rules', () => {
      const html = generateHTML(mockResult);
      expect(html).toContain('.mobile-ad');
      expect(html).toContain('display: block');
      expect(html).toContain('display: none');
    });

    it('should include error container styling', () => {
      const html = generateHTML(mockResult);
      expect(html).toContain('.error-container');
      expect(html).toContain('background: #fee');
      expect(html).toContain('border: 2px solid #e74c3c');
    });

    it('should include JSON container styling', () => {
      const html = generateHTML(mockResult);
      expect(html).toContain('.json-container');
      expect(html).toContain('background: #2d3748');
      expect(html).toContain('.json-code');
    });
  });

  describe('JavaScript functionality', () => {
    const mockResult = { ip: '8.8.8.8', country: 'US' };

    it('should include mobile detection logic', () => {
      const html = generateHTML(mockResult);
      expect(html).toContain('const isMobile = window.innerWidth < 768');
      expect(html).toContain('getElementById(\'mobile-ad-container\')');
    });

    it('should include conditional ad injection', () => {
      const html = generateHTML(mockResult);
      expect(html).toContain('if (isMobile && mobileAdContainer)');
      expect(html).toContain('mobileAdContainer.innerHTML =');
      expect(html).toContain('mobileAdContainer.style.display = \'block\'');
      expect(html).toContain('mobileAdContainer.style.display = \'none\'');
    });

    it('should include AdSense initialization', () => {
      const html = generateHTML(mockResult);
      expect(html).toContain('window.adsbygoogle = window.adsbygoogle || []');
      expect(html).toContain('window.adsbygoogle.push({})');
    });
  });
}); 