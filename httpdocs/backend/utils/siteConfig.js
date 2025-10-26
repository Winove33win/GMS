const rawCanonicalBase = (process.env.SITE_URL || '').trim();
const canonicalBase = rawCanonicalBase
  ? rawCanonicalBase.includes('://')
    ? rawCanonicalBase
    : `https://${rawCanonicalBase}`
  : '';

let canonicalUrl = null;
if (canonicalBase) {
  try {
    canonicalUrl = new URL(canonicalBase);
  } catch (_err) {
    canonicalUrl = null;
  }
}

export const siteConfig = {
  port: Number(process.env.PORT || 3000),
  canonicalBase,
  canonicalUrl,
  get canonicalHostname() {
    return canonicalUrl ? canonicalUrl.hostname.toLowerCase() : '';
  },
  get canonicalPort() {
    return canonicalUrl ? canonicalUrl.port || '' : '';
  },
  get canonicalProtocol() {
    return canonicalUrl ? canonicalUrl.protocol.replace(':', '') : '';
  },
  get canonicalOrigin() {
    return canonicalUrl ? canonicalUrl.origin : '';
  },
  get hasCanonical() {
    return Boolean(canonicalUrl);
  },
};
