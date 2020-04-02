const net = require('net');

const { router, get } = require('microrouter');
const { send } = require('micro');
const geoip = require('geoip-lite');

const rootRoute = async (req, res) => {
  const ip = req.query['ip'];

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
    const result = geoip.lookup(ip);
    send(res, 200, result);
  } catch (err) {
    send(res, 500, { error: err });
  }
};

module.exports = router(get('/', rootRoute));
