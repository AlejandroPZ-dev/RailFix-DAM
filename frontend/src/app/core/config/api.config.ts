const protocol = window.location.protocol;
const hostname = window.location.hostname || 'localhost';

export const API_BASE_URL = `${protocol}//${hostname}:8080/api`;
