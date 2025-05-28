const generateHTML = (result) => {
    const isError = result && result.error;
    const hasValidData = result && !result.error && Object.keys(result).length > 0;
    
    return `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="author" content="Ahmed Tokyo">
            <link rel="author" href="https://ahmedtokyo.com">
            
            <title>Micro GeoIP Lite - Fast, Free and Open Source IP Geolocation Service</title>
            <meta name="description" content="Get detailed geolocation information for any IP address including country, region, city, coordinates, timezone and more.">

            <!-- Open Graph / Facebook -->
            <meta property="og:type" content="website">
            <meta property="og:url" content="https://micro-geoip-lite.ahmedtokyo.com/">
            <meta property="og:title" content="Micro GeoIP Lite - Fast, Free and Open Source IP Geolocation Service">
            <meta property="og:description" content="Get detailed geolocation information for any IP address including country, region, city, coordinates, timezone and more.">
            <meta property="og:image" content="https://ahmedtokyo.com/_next/image?url=%2Fimages%2Fprojects%2Fmicro_geoip_lite%2Fcover.jpg&w=3840&q=75">

            <!-- Twitter -->
            <meta property="twitter:card" content="summary_large_image">
            <meta property="twitter:url" content="https://micro-geoip-lite.ahmedtokyo.com/">
            <meta property="twitter:title" content="Micro GeoIP Lite - Fast, Free and Open Source IP Geolocation Service">
            <meta property="twitter:description" content="Get detailed geolocation information for any IP address including country, region, city, coordinates, timezone and more.">
            <meta property="twitter:image" content="https://ahmedtokyo.com/_next/image?url=%2Fimages%2Fprojects%2Fmicro_geoip_lite%2Fcover.jpg&w=3840&q=75">

            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                max-width: 1200px;
                margin: 0 auto;
                padding: 20px;
                line-height: 1.6;
                color: #333;
              }
              h1 {
                color: #2c3e50;
                border-bottom: 2px solid #3498db;
                padding-bottom: 10px;
                margin-bottom: 30px;
              }
              h2 {
                color: #2c3e50;
                border-bottom: 2px solid #3498db;
                padding-bottom: 10px;
                margin-top: 0;
                margin-bottom: 20px;
              }
              .content-grid {
                display: grid;
                grid-template-columns: 1fr;
                gap: 30px;
                margin-bottom: 30px;
              }
              @media (min-width: 768px) {
                .content-grid {
                  grid-template-columns: 1fr 1fr;
                }
              }
              .info-section, .json-section {
                min-width: 0; /* Prevents grid items from overflowing */
              }
              ul {
                background: #f8f9fa;
                padding: 20px;
                border-radius: 8px;
                border-left: 4px solid #3498db;
                margin: 0;
              }
              li {
                margin: 8px 0;
              }
              .json-container {
                background: #2d3748;
                border-radius: 8px;
                padding: 20px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                height: fit-content;
              }
              .json-code {
                color: #e2e8f0;
                font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
                font-size: 14px;
                line-height: 1.5;
                white-space: pre-wrap;
                word-wrap: break-word;
                margin: 0;
                overflow-x: auto;
              }
              .mobile-ad {
                display: block;
                margin: 20px 0;
              }
              @media (min-width: 768px) {
                .mobile-ad {
                  display: none;
                }
              }
              .seo-content {
                margin-top: 40px;
                padding: 30px;
                background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
                border-radius: 12px;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
              }
              .seo-content h2 {
                color: #2c3e50;
                font-size: 28px;
                margin-bottom: 20px;
                text-align: center;
              }
              .seo-content h3 {
                color: #34495e;
                font-size: 22px;
                margin-top: 30px;
                margin-bottom: 15px;
                border-left: 4px solid #3498db;
                padding-left: 15px;
              }
              .seo-content h4 {
                color: #2c3e50;
                font-size: 18px;
                margin-top: 20px;
                margin-bottom: 10px;
              }
              .seo-content p {
                margin-bottom: 15px;
                text-align: justify;
                line-height: 1.7;
              }
              .seo-content ul {
                background: rgba(255, 255, 255, 0.7);
                margin-bottom: 20px;
              }
              .seo-content li {
                margin: 10px 0;
              }
              .code-block {
                background: #2d3748;
                border-radius: 8px;
                padding: 15px;
                margin: 15px 0;
                overflow-x: auto;
              }
              .code-block pre {
                margin: 0;
                color: #e2e8f0;
                font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
                font-size: 14px;
              }
              .code-block code {
                color: #e2e8f0;
              }
              .use-cases {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 20px;
                margin: 20px 0;
              }
              .use-case {
                background: rgba(255, 255, 255, 0.8);
                padding: 20px;
                border-radius: 8px;
                border-left: 4px solid #e74c3c;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              }
              .use-case h4 {
                margin-top: 0;
                color: #e74c3c;
              }
              .seo-content a {
                color: #3498db;
                text-decoration: none;
                font-weight: 600;
              }
              .seo-content a:hover {
                text-decoration: underline;
              }
              .error-container {
                background: #fee;
                border: 2px solid #e74c3c;
                border-radius: 8px;
                padding: 20px;
                margin: 20px 0;
              }
              .error-container p {
                margin: 10px 0;
                color: #c0392b;
              }
              .error-container ul {
                background: rgba(255, 255, 255, 0.8);
                border-left: 4px solid #e74c3c;
              }
              .no-data {
                background: #fff3cd;
                border: 2px solid #ffc107;
                border-radius: 8px;
                padding: 20px;
                margin: 20px 0;
                text-align: center;
              }
              .no-data p {
                color: #856404;
                margin: 0;
              }
            </style>
          </head>
          <body>
            <h1>GeoIP Information</h1>
            
            <div class="content-grid">
              <div class="info-section">
                ${isError ? `
                  <h2>Error</h2>
                  <div class="error-container">
                    <p><strong>❌ ${result.error}</strong></p>
                    <p>Please check your IP address and try again. Make sure you're providing a valid IPv4 or IPv6 address.</p>
                    <p><strong>Examples of valid IPs:</strong></p>
                    <ul>
                      <li>8.8.8.8 (Google DNS)</li>
                      <li>1.1.1.1 (Cloudflare DNS)</li>
                      <li>207.97.227.239 (Example IP)</li>
                    </ul>
                  </div>
                ` : `
                  <h2>Details</h2>
                  ${hasValidData ? `
                    <ul>
                      ${Object.entries(result || {}).map(
                        ([key, value]) =>
                          `<li><strong>${key}:</strong> ${value}</li>`
                      ).join('')}
                    </ul>
                  ` : `
                    <div class="no-data">
                      <p>No geolocation data available for this IP address.</p>
                    </div>
                  `}
                `}
              </div>
  
             <div class="mobile-ad" id="mobile-ad-container" style="max-width: 100%; overflow: hidden;">
                 <!-- Mobile ad slot 9567852882 will be injected here by JS if screen is small -->
             </div>
               
                <div class="json-section">
                  <h2>Raw JSON Data</h2>
                  <div class="json-container">
                    <pre class="json-code">${JSON.stringify(result || {}, null, 2)}</pre>
                  </div>
                </div>
            </div>

            <div style="max-width: 100%; overflow: hidden;">
                <!-- micro-geoip-lite-center-1 -->
                <ins class="adsbygoogle"
                    style="display:block"
                    data-ad-client="ca-pub-5266987079964279"
                    data-ad-slot="8543379979"
                    data-ad-format="auto"></ins>
            </div>

            <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5266987079964279"
                crossorigin="anonymous"></script>

            <script>
              document.addEventListener('DOMContentLoaded', function() {
                const mobileAdContainer = document.getElementById('mobile-ad-container');
                const isMobile = window.innerWidth < 768;

                if (isMobile && mobileAdContainer) {
                  // Inject mobile ad for small screens
                  mobileAdContainer.innerHTML = '<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-5266987079964279" data-ad-slot="9567852882" data-ad-format="auto"></ins>';
                  mobileAdContainer.style.display = 'block';
                } else if (mobileAdContainer) {
                  // Hide container for larger screens
                  mobileAdContainer.style.display = 'none';
                }

                // Initialize ads after DOM setup
                window.adsbygoogle = window.adsbygoogle || [];
                window.adsbygoogle.push({});
              });
            </script>

            <div class="seo-content">
              <section class="info-section">
                <h2>🌍 Free & Open Source IP Geolocation API</h2>
                <p>Micro GeoIP Lite is a <strong>fast, free, and open-source IP geolocation service</strong> that provides detailed location information for any IP address. Our <strong>JSON API</strong> is perfect for developers who need reliable geolocation data without the complexity of traditional services.</p>
                
                <h3>🚀 Why Choose Micro GeoIP Lite?</h3>
                <ul>
                  <li><strong>Lightning Fast:</strong> Sub-second response times for instant IP geolocation</li>
                  <li><strong>100% Free:</strong> No API keys, no rate limits, no hidden costs</li>
                  <li><strong>Open Source:</strong> Self-hostable and one-click deployable</li>
                  <li><strong>JSON API:</strong> Clean, structured data format for easy integration</li>
                  <li><strong>Reliable:</strong> Built on MaxMind's trusted IP database</li>
                  <li><strong>Privacy-First:</strong> No logging, no tracking, no data retention</li>
                </ul>

                <h3>💻 Perfect for Backend Development</h3>
                <p>Backend developers love Micro GeoIP Lite for:</p>
                <ul>
                  <li><strong>User Localization:</strong> Automatically detect user's country and timezone</li>
                  <li><strong>Content Delivery:</strong> Route users to nearest servers based on location</li>
                  <li><strong>Fraud Prevention:</strong> Detect suspicious login attempts from unusual locations</li>
                  <li><strong>Analytics:</strong> Track visitor demographics and geographic distribution</li>
                  <li><strong>Compliance:</strong> Implement GDPR and regional data protection rules</li>
                  <li><strong>Load Balancing:</strong> Distribute traffic based on geographic regions</li>
                </ul>

                <h3>🌐 Frontend & Client-Side Integration</h3>
                <p><strong>Works seamlessly in any client</strong> - from React and Vue to vanilla JavaScript! Our <strong>super fast API</strong> is perfect for frontend applications that need instant geolocation data:</p>
                <ul>
                  <li><strong>Browser Applications:</strong> Works in Chrome, Firefox, Safari, Edge - any modern browser</li>
                  <li><strong>Mobile Apps:</strong> React Native, Ionic, Cordova, and native mobile apps</li>
                  <li><strong>Desktop Apps:</strong> Electron, Tauri, and other desktop frameworks</li>
                  <li><strong>Real-time Features:</strong> Live location-based content updates</li>
                  <li><strong>Progressive Web Apps:</strong> Offline-capable PWAs with location awareness</li>
                  <li><strong>Single Page Applications:</strong> Instant geolocation without page reloads</li>
                </ul>

                <h4>⚡ Lightning-Fast Frontend Performance</h4>
                <p>Frontend developers choose us because we're <strong>blazingly fast</strong>:</p>
                <ul>
                  <li><strong>Sub-100ms Response:</strong> Faster than most database queries</li>
                  <li><strong>CDN Optimized:</strong> Global edge locations for minimal latency</li>
                  <li><strong>No CORS Issues:</strong> Properly configured for cross-origin requests</li>
                  <li><strong>Lightweight Payload:</strong> Minimal JSON response for fast parsing</li>
                  <li><strong>Caching Friendly:</strong> Optimized headers for browser caching</li>
                </ul>

                <h3>📦 JavaScript NPM Package Available</h3>
                <p>Get started instantly with our <strong>JavaScript library</strong>:</p>
                <div class="code-block">
                  <pre><code>npm install micro-geoip-lite</code></pre>
                </div>
                <div class="code-block">
                  <pre><code>import geodecodeIp from 'micro-geoip-lite';

// Get current user's IP info
const result = await geodecodeIp();

// Get specific IP info  
const ipInfo = await geodecodeIp('8.8.8.8');</code></pre>
                </div>
                <p>The <a href="https://www.npmjs.com/package/micro-geoip-lite" target="_blank" rel="noopener">micro-geoip-lite npm package</a> provides a simple, typed interface for accessing geolocation data in your Node.js and browser applications.</p>

                <h3>🔒 IP Privacy & VPN Detection</h3>
                <p><strong>Your IP address reveals more than you think:</strong></p>
                <ul>
                  <li><strong>Geographic Location:</strong> Country, region, city, and coordinates</li>
                  <li><strong>ISP Information:</strong> Internet service provider and organization</li>
                  <li><strong>Connection Type:</strong> Residential, business, or data center</li>
                  <li><strong>Timezone:</strong> Local time zone for accurate scheduling</li>
                  <li><strong>Network Range:</strong> IP block and subnet information</li>
                </ul>

                <h4>🛡️ Protect Your Privacy with VPNs</h4>
                <p>To secure your real IP address and location:</p>
                <ul>
                  <li><strong>Use a VPN:</strong> Virtual Private Networks mask your real IP</li>
                  <li><strong>Tor Browser:</strong> Routes traffic through multiple encrypted layers</li>
                  <li><strong>Proxy Services:</strong> Act as intermediaries for your requests</li>
                  <li><strong>Mobile Hotspots:</strong> Use different network connections</li>
                </ul>

                <h3>🏗️ Self-Hostable & Deployable</h3>
                <p>Deploy your own instance with <strong>one-click deployment</strong>:</p>
                <ul>
                  <li><strong>Docker Support:</strong> Containerized for easy deployment</li>
                  <li><strong>Vercel/Netlify:</strong> Serverless deployment options</li>
                  <li><strong>AWS/GCP/Azure:</strong> Cloud platform compatibility</li>
                  <li><strong>On-Premise:</strong> Run on your own infrastructure</li>
                </ul>

                <h3>🎯 Use Cases & Applications</h3>
                <div class="use-cases">
                  <div class="use-case">
                    <h4>E-commerce</h4>
                    <p>Automatic currency detection, shipping calculations, tax compliance</p>
                  </div>
                  <div class="use-case">
                    <h4>Security</h4>
                    <p>Fraud detection, suspicious activity monitoring, access control</p>
                  </div>
                  <div class="use-case">
                    <h4>Analytics</h4>
                    <p>Visitor tracking, demographic analysis, traffic optimization</p>
                  </div>
                  <div class="use-case">
                    <h4>Content</h4>
                    <p>Geo-targeted content, language detection, regional compliance</p>
                  </div>
                </div>

                <h3>🔧 API Features</h3>
                <p>Our <strong>RESTful JSON API</strong> provides:</p>
                <ul>
                  <li><strong>Country Code:</strong> ISO 3166-1 alpha-2 country codes</li>
                  <li><strong>Region/State:</strong> Administrative subdivision information</li>
                  <li><strong>City Name:</strong> Municipal location data</li>
                  <li><strong>Coordinates:</strong> Latitude and longitude for mapping</li>
                  <li><strong>Timezone:</strong> IANA timezone identifiers</li>
                  <li><strong>ISP Details:</strong> Internet service provider information</li>
                  <li><strong>EU Status:</strong> European Union membership indicator</li>
                </ul>
              </section>
            </div>
          </body>
        </html>
      `;
};

module.exports = generateHTML;