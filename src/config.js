module.exports = {
  JWT_SECRET: process.env.JWT_SECRET || 'Louie Louie, oh no, I got to go Louie Louie, oh no, I got to go',
  BUDDY_SERVICE_URL: process.env.BUDDY_SERVICE_URL || 'https://buddy.demo.minelev.t-fk.win',
  MINELEV_URL: process.env.MINELEV_URL || 'https://web.demo.minelev.t-fk.win',
  MAIL_SERVICE_URL: process.env.MAIL_SERVICE_URL || 'https://mail.service.io',
  MAIL_SERVICE_SECRET: process.env.MAIL_SERVICE_SECRET || 'Louie Louie, oh no, I got to go Louie Louie, oh no, I got to go',
  PAPERTRAIL_HOSTNAME: process.env.PAPERTRAIL_HOSTNAME || 'minelev-buddy',
  PAPERTRAIL_HOST: process.env.PAPERTRAIL_HOST || 'logs.papertrailapp.com',
  PAPERTRAIL_PORT: process.env.PAPERTRAIL_PORT || 12345
}