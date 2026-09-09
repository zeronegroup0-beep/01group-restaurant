const BACKEND_URL = 'https://demashqi-restaurant-backend.5ormelsamak.workers.dev';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // Proxy all /api requests to the live backend Cloudflare Worker
    if (pathname.startsWith('/api')) {
      const backendUrl = new URL(pathname + url.search, BACKEND_URL);
      const newRequest = new Request(backendUrl.toString(), request);
      return fetch(newRequest);
    }

    // Pass through requests for static assets (files with extensions)
    if (pathname.match(/\.[a-zA-Z0-9]+$/)) {
      return env.ASSETS.fetch(request);
    }

    // For all SPA routes, serve index.html via GET method
    const indexUrl = new URL('/index.html', url.origin);
    return env.ASSETS.fetch(new Request(indexUrl.toString(), {
      method: 'GET',
      headers: request.headers
    }));
  },
};
