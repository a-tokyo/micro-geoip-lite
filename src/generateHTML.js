const generateHTML = (result) => {
    return `
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
            </style>
          </head>
          <body>
            <h1>GeoIP Information</h1>
            
            <div class="content-grid">
              <div class="info-section">
                <h2>Details</h2>
                <ul>
                  ${Object.entries(result || {}).map(
                    ([key, value]) =>
                      `<li><strong>${key}:</strong> ${value}</li>`
                  ).join('')}
                </ul>
                            </div>
  
             <div class="mobile-ad" style="max-width: 100%; overflow: hidden;">
                 <!-- micro-geoip-lite-center-1 -->
                 <ins class="adsbygoogle"
                     style="display:block"
                     data-ad-client="ca-pub-5266987079964279"
                     data-ad-slot="9567852882"
                     data-ad-format="auto"
                     data-full-width-responsive="true"></ins>
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
                    data-ad-format="auto"
                    data-full-width-responsive="true"></ins>
            </div>

            <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
            <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5266987079964279"
                crossorigin="anonymous"></script>
          </body>
        </html>
      `;
};

module.exports = generateHTML;