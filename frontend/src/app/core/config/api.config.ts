const protocol = window.location.protocol;
const hostname = window.location.hostname || 'localhost';
const origin = window.location.origin;

const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';
const isPrivateNetworkHost =
  /^192\.168\./.test(hostname)
  || /^10\./.test(hostname)
  || /^172\.(1[6-9]|2\d|3[0-1])\./.test(hostname);

const isDevelopmentHost = isLocalhost || isPrivateNetworkHost;

export const API_BASE_URL = isDevelopmentHost
  ? `${protocol}//${hostname}:8080/api`
  : `${origin}/api`;
