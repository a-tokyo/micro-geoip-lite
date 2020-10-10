const net = require('net');

const { router, get } = require('microrouter');
const { send } = require('micro');
const geoip = require('geoip-lite');
const get_ip = require('ipware')().get_ip;

const lookup = require('./lookup');

const DEFAULT_TIMEOUT = 1000 * 5; // 5 seconds
const MAX_TIMEOUT = DEFAULT_TIMEOUT * 2;

/**
 * Root Route
 * @queryparam {string} ip - IP to geo decode
 * @queryparam {string} timout - timout in ms
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
    const result = await lookup(ip, Math.min(timeout, MAX_TIMEOUT));
    send(res, 200, result);
  } catch (err) {
    send(res, 500, { error: err && err.message });
  }
};

module.exports = router(get('/', rootRoute));
