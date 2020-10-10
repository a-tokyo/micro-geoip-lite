const geoip = require('geoip-lite');

const lookup = require('./lookup');

jest.useFakeTimers();

const _originalGeoipLookup = geoip.lookup;

describe('lookup', () => {
  afterEach(() => {
    geoip.lookup = _originalGeoipLookup;
  });

  it('should lookup the ip', async () => {
    const ip = '207.97.227.239';
    const result = await lookup(ip);
    expect(result).toEqual(
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
  });

  it('should reject if geoip lookup fails', async () => {
    geoip.lookup = jest.fn(() => null);
    const ip = '207.97.227.239';
    let errVal;
    try {
      const result = await lookup(ip);
    } catch (err) {
      errVal = err;
    }

    expect(errVal).toEqual(expect.any(Error));
    expect(errVal.message.includes('Failed')).toEqual(true);
  });

  it('should reject if timeout exceeded', async () => {
    geoip.lookup = jest.fn(() => {
      jest.advanceTimersByTime(1000);
      return null;
    });
    const ip = '207.97.227.239';
    let errVal;
    try {
      const result = await lookup(ip, 100);
    } catch (err) {
      errVal = err;
    }

    expect(errVal).toEqual(expect.any(Error));
    expect(errVal.message.includes('timeout')).toEqual(true);
  });
});
