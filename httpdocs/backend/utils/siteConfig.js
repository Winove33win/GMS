export const siteConfig = {
  port: Number(process.env.PORT || 3000),
  canonicalBase: process.env.SITE_URL || 'https://gms.example.com',
  get canonicalUrl() {
    const base = this.canonicalBase.includes('://')
      ? this.canonicalBase
      : `https://${this.canonicalBase}`;
    return new URL(base);
  },
  get canonicalHostname() {
    return this.canonicalUrl.hostname.toLowerCase();
  },
  get canonicalPort() {
    return this.canonicalUrl.port || '';
  },
  get canonicalProtocol() {
    return this.canonicalUrl.protocol.replace(':', '');
  },
  get canonicalOrigin() {
    return this.canonicalUrl.origin;
  },
};
