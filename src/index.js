const net = require('net');

const { router, get } = require('microrouter');
const { send } = require('micro');
const geoip = require('geoip-lite');
const get_ip = require('ipware')().get_ip;

const lookup = require('./lookup');
const generateHTML = require('./generateHTML');

const DEFAULT_TIMEOUT = 1000 * 5; // 5 seconds
const MIN_TIMEOUT = 500; // 1/2 second
const MAX_TIMEOUT = DEFAULT_TIMEOUT * 2; // 10 seconds

/**
 * Root Route
 * @queryparam {string} ip - IP to geo decode
 * @queryparam {string} timout - timeout in ms
 */
const rootRoute = async (req, res) => {
  const ip = req.query['ip'] || get_ip(req).clientIp;
  const timeout = Number(req.query['timeout']) || DEFAULT_TIMEOUT;

  if (!net.isIP(ip)) {
    return send(res, 400, { error: 'Please only submit valid IPs' });
  }

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, PUT, POST, DELETE, OPTIONS',
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
  );

  try {
    const result = await lookup(
      ip,
      Math.max(MIN_TIMEOUT, Math.min(timeout, MAX_TIMEOUT)),
    );

    const accept = req.headers['accept'] || '';
    if (accept.includes('text/html')) {
      const html = generateHTML(result);
      res.setHeader('Content-Type', 'text/html');
      return res.end(html);
    } else {
      return send(res, 200, result);
    }
  } catch (err) {
    return send(res, 500, { error: err && err.message });
  }
};

module.exports = router(get('/', rootRoute));