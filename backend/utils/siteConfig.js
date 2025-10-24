const DEFAULT_DEPLOYMENT_URL = 'https://confident-heyrovsky.168-75-84-128.plesk.page';

const ensureProtocol = (value, fallback) => {
  const trimmed = (value || '').toString().trim();
  if (!trimmed) {
    return ensureProtocol(fallback, DEFAULT_DEPLOYMENT_URL);
  }
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }
  return `https://${trimmed.replace(/^\/*/, '')}`;
};

const safeParseUrl = (rawValue, fallbackValue) => {
  const withProtocol = ensureProtocol(rawValue, fallbackValue);
  try {
    return new URL(withProtocol);
  } catch (_err) {
    const fallbackWithProtocol = ensureProtocol(fallbackValue, DEFAULT_DEPLOYMENT_URL);
    return new URL(fallbackWithProtocol);
  }
};

const port = Number(process.env.PORT || 3000);
const localFallback = `http://127.0.0.1:${port}`;
const productionFallback = ensureProtocol(process.env.SITE_URL, DEFAULT_DEPLOYMENT_URL);

const fallbackBase = process.env.NODE_ENV === 'development' ? localFallback : productionFallback;

const canonicalUrl = safeParseUrl(
  process.env.APP_BASE_URL ||
    process.env.PUBLIC_BASE_URL ||
    process.env.SITE_URL ||
    fallbackBase,
  fallbackBase
);

const canonicalPath = canonicalUrl.pathname.replace(/\/$/, '');
const canonicalBase = `${canonicalUrl.origin}${canonicalPath}`.replace(/\/$/, '');

export const siteConfig = {
  port,
  canonicalUrl,
  canonicalBase,
  canonicalOrigin: canonicalUrl.origin,
  canonicalHostname: canonicalUrl.hostname.toLowerCase(),
  canonicalHost: canonicalUrl.host.toLowerCase(),
  canonicalPort: canonicalUrl.port,
  canonicalProtocol: canonicalUrl.protocol.replace(':', '').toLowerCase(),
  localFallback,
  productionFallback,
};

export const toAbsoluteFromSite = (value) => {
  if (!value) {
    return `${siteConfig.canonicalOrigin}/`;
  }
  if (/^https?:\/\//i.test(value)) {
    return value;
  }
  const normalised = String(value).replace(/^\/+/, '');
  return `${siteConfig.canonicalBase}/${normalised}`;
};
