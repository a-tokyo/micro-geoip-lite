const net = require('net');

const { router, get } = require('microrouter');
const { send } = require('micro');
const get_ip = require('ipware')().get_ip;

const lookup = require('./lookup');
const generateHTML = require('./generateHTML');

const DEFAULT_TIMEOUT = 1000 * 5; // 5 seconds
const MIN_TIMEOUT = 500; // 1/2 second
const MAX_TIMEOUT = DEFAULT_TIMEOUT * 2; // 10 seconds

/**
 * Helper function to send error responses in either HTML or JSON format
 * @param {Object} res - Response object
 * @param {number} statusCode - HTTP status code
 * @param {Object} errorResult - Error object with error message
 * @param {boolean} isHtmlRequest - Whether to send HTML response
 */
const _sendErrorResponse = (res, statusCode, errorResult, isHtmlRequest) => {
  if (isHtmlRequest) {
    const html = generateHTML(errorResult);
    res.setHeader('Content-Type', 'text/html');
    return send(res, statusCode, html);
  } else {
    return send(res, statusCode, errorResult);
  }
};

/**
 * Helper function to send success responses in either HTML or JSON format
 * @param {Object} res - Response object
 * @param {Object} result - Success result object
 * @param {boolean} isHtmlRequest - Whether to send HTML response
 */
const _sendSuccessResponse = (res, result, isHtmlRequest) => {
  if (isHtmlRequest) {
    const html = generateHTML(result);
    res.setHeader('Content-Type', 'text/html');
    return send(res, 200, html);
  } else {
    return send(res, 200, result);
  }
};

/**
 * Root Route
 * @queryparam {string} ip - IP to geo decode
 * @queryparam {string} timout - timeout in ms
 */
const rootRoute = async (req, res) => {
  const ip = req.query['ip'] ?? get_ip(req).clientIp;
  const timeout = Number(req.query['timeout']) || DEFAULT_TIMEOUT;
  const accept = req.headers['accept'] || '';
  const isHtmlRequest = accept.includes('text/html');

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, PUT, POST, DELETE, OPTIONS',
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
  );

  if (!net.isIP(ip)) {
    const errorResult = { error: 'Please only submit valid IPs' };
    return _sendErrorResponse(res, 400, errorResult, isHtmlRequest);
  }

  try {
    const result = await lookup(
      ip,
      Math.max(MIN_TIMEOUT, Math.min(timeout, MAX_TIMEOUT)),
    );

    return _sendSuccessResponse(res, result, isHtmlRequest);
  } catch (err) {
    const errorResult = { error: err && err.message };
    return _sendErrorResponse(res, 500, errorResult, isHtmlRequest);
  }
};

module.exports = router(get('/', rootRoute));