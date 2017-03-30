[![Build Status](https://travis-ci.org/telemark/minelev-notifications.svg?branch=master)](https://travis-ci.org/telemark/minelev-notifications)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
[![Greenkeeper badge](https://badges.greenkeeper.io/telemark/minelev-notifications.svg)](https://greenkeeper.io/)

# minelev-notifications

Notifications for MinElev

## API

All API calls needs an Authorization header with valid jwt  

### ```POST /warnings```

POST a generated warning from MinElev.
This service will notify contact teachers if one of their students has received a warning.

Returns

```JavaScript
{
  success: true,
  notifications: '<number-of-notifications>',
  logs: ['log-from-each-notification']
}
```

## Docker

### Config ```production.env```
```bash
NODE_ENV=production
JWT_SECRET=@minelev-jwt-secret
SENDGRID_SECRET=@minelev-sendgrid-secret
MINELEV_URL=https://www.minelev.com
BUDDY_SERVICE_URL=@minelev-buddy-service-url
```

## Related

- [minelev-web](https://github.com/telemark/minelev-web) web frontend for MinElev
- [minelev-logs](https://github.com/telemark/minelev-logs) Logs service for MinElev
- [minelev-buddy](https://github.com/telemark/minelev-buddy) buddy service for MinElev
- [minelev-leder](https://github.com/telemark/minelev-leder) web frontend for MinElev - school administration

## License

[MIT](LICENSE)

![Robohash image of minelev-notifications](https://robots.kebabstudios.party/minelev-notifications.png "Robohash image of minelev-notifications")