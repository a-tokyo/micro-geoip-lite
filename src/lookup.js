const geoip = require('geoip-lite');

/**
 * geoip lookup function with time limiter
 * @param {string} ip
 * @param {number} timeout
 */
const lookup = (ip, timeout = 1000) =>
  new Promise(async (resolve, reject) => {
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
      return resolve({ ip, ...result });
    }
    /* reject - failed to fin */
    return reject(new Error('Failed to find IP'));
  });

module.exports = lookup;
