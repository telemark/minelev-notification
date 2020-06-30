[![Build Status](https://travis-ci.org/telemark/minelev-notifications.svg?branch=master)](https://travis-ci.org/telemark/minelev-notifications)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

# minelev-notifications

Notifications for MinElev

## API

All API calls needs an Authorization header with valid jwt  

### ```POST /warnings```

POST a generated warning from MinElev.
This service will notify contact teachers if one of their students has received a warning.

*See example data in test/data/warning.json*

Returns

```JavaScript
{
  success: true,
  notifications: '<number-of-notifications>',
  logs: ['log-from-each-notification']
}
```

### ```POST /yff```

POST a generated yff notification from MinElev-saksbehandler-robot.
This service will send emails to the persons specified in the "copy to" field.

*See example data in test/data/yff.json*

Returns

```JavaScript
{
  success: true,
  log: ['log-from-notification']
}
```

## Development

Add a local .env file

```
NODE_ENV=development
JWT_SECRET=jwt-secret
MINELEV_URL=url-to-minelev
BUDDY_SERVICE_URL=buddy-service-url
MAIL_SERVICE_URL=maiul-service-url
MAIL_SERVICE_SECRET=mail-service-secret
MAIL_VTFK_TEMPLATE_ID=sendgrid-template-id
PAPERTRAIL_HOSTNAME=minelev
PAPERTRAIL_HOST=logs.papertrails.com
PAPERTRAIL_PORT=12345
```

Run the dev script

```
$ now dev
```

## Deploy to ZEIT/Now - Manually

Configure [now.json](now.json)

Run the deployscripts

```
$ npm run deploy:test
$ npm run deploy:prod
```

## Deploy to ZEIT/Now - Automatically

Configure [now.json](now.json) and [GitHub actions](.github)

Do a release

## Related

- [minelev-web](https://github.com/telemark/minelev-web) web frontend for MinElev
- [minelev-logs](https://github.com/telemark/minelev-logs) Logs service for MinElev
- [minelev-buddy](https://github.com/telemark/minelev-buddy) buddy service for MinElev
- [minelev-leder](https://github.com/telemark/minelev-leder) web frontend for MinElev - school administration

## License

[MIT](LICENSE)