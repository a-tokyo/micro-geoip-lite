# micro-geoip-lite

> 🌍 Small microservice that geo looks up an IP for free using geoip-lite database.

[![codecov](https://codecov.io/gh/A-Tokyo/micro-geoip-lite/branch/main/graph/badge.svg)](https://codecov.io/gh/A-Tokyo/micro-geoip-lite)

## Usage

- [https://geoip-lite.now.sh/?ip=207.97.227.239](https://geoip-lite.now.sh/?ip=207.97.227.239)
```js
{
  ip: '207.97.227.239', // if ip param was not provided, this defaults to request.ip
  range: [ 3479298048, 3479300095 ],
  country: 'US',
  region: 'TX',
  eu: '0',
  timezone: 'America/Chicago',
  city: 'San Antonio',
  ll: [ 29.4969, -98.4032 ],
  metro: 641,
  area: 1000,
  error: 'Error text', // only exists if an error happened
}
```

### Query Params
- ip?: string // IP to lookup, defaults to request.ip
- timeout?: : number // timeout before failing, defaults to 5 seconds -- maximum of 10 seconds and minimum of 1/2 seconds

### Usage with JS
- A library is available for javascript out of the box on npm [micro-geoip-lite-js](https://github.com/A-Tokyo/micro-geoip-lite-js).

---

## Automation Note
- This repo is auto maintained by bots. For example: dependabot opens weekly PRs to upgrade dependencies that are auto merged if the tests pass.
- This will keep the repo up to date with minimal human interaction.

Hosted on [now](https://zeit.co/now)
