const net = require('net');

const { router, get } = require('microrouter');
const { send } = require('micro');
const geoip = require('geoip-lite');

const DEFAULT_TIMEOUT = 1000 * 5; // 5 seconds

/**
 * geoip lookup function with time limiter
 * @param {string} ip
 * @param {number} timeout
 */
const lookup = (ip, timeout) =>
  new Promise((resolve, reject) => {
    /* setTimeout safeguard */
    const timeoutTimer = setTimeout(
      /**reject - timeout exceeded */
      () => reject(new Error(`timeout - exceeded ${timeout}ms`)),
      timeout,
    );
    /* Execute */
    const result = geoip.lookup(ip);
    /* Clear timer */
    clearTimeout(timeoutTimer);
    /* resolve */
    if (result) {
      return resolve(result);
    }
    /* reject - failed to fin */
    return reject(new Error('Failed to find IP'));
  });

/**
 * Root Route
 * @queryparam {string} ip - IP to geo decode
 * @queryparam {string} timout - timout in ms
 */
const rootRoute = async (req, res) => {
  const ip = req.query['ip'];
  const timeout = Number(req.query['timeout']) || DEFAULT_TIMEOUT;

  if (!ip) {
    return send(res, 400, { error: 'Please submit an IP in the querystring' });
  }

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
    const result = await lookup(ip, timeout);
    send(res, 200, result);
  } catch (err) {
    send(res, 500, { error: err });
  }
};

module.exports = router(get('/', rootRoute));
