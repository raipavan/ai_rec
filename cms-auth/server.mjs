/**
 * GitHub sign-in for the content manager (Decap CMS).
 *
 * Decap runs in the browser and cannot hold the GitHub OAuth client secret, so
 * this small service does the exchange: /auth sends the editor to GitHub,
 * /callback swaps the returned code for a token and hands it back to the
 * /admin window. No dependencies; Node 18 or newer.
 *
 * Environment:
 *   GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET  from a GitHub OAuth app whose
 *       callback URL is https://<this-service>/callback
 *   SITE_ORIGIN   the website's origin, e.g. https://www.talentpool365.com
 *                 (only this origin is ever sent the token)
 *   PORT          set by the host
 */
import { createServer } from 'node:http';
import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto';

const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, SITE_ORIGIN, PORT = '3000' } = process.env;

for (const name of ['GITHUB_CLIENT_ID', 'GITHUB_CLIENT_SECRET', 'SITE_ORIGIN']) {
  if (!process.env[name]) {
    console.error(`Missing environment variable ${name}`);
    process.exit(1);
  }
}

const siteOrigin = new URL(SITE_ORIGIN).origin;
const sign = (value) => createHmac('sha256', GITHUB_CLIENT_SECRET).update(value).digest('hex');

/** Signed, short-lived state so a callback can only complete a sign-in this service started. */
const newState = () => {
  const payload = `${Date.now()}.${randomBytes(16).toString('hex')}`;
  return `${payload}.${sign(payload)}`;
};
const validState = (state = '') => {
  const [time, nonce, mac] = state.split('.');
  if (!time || !nonce || !mac) return false;
  const expected = sign(`${time}.${nonce}`);
  if (mac.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(mac), Buffer.from(expected)) && Date.now() - Number(time) < 10 * 60 * 1000;
};

/** The page GitHub returns the editor to: it passes the result to the /admin window and closes. */
const resultPage = (status, content) => `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>Signing in…</title></head>
<body><p>Signing in… you can close this window if it stays open.</p>
<script>
(function () {
  var allowed = ${JSON.stringify(siteOrigin)};
  var message = 'authorization:github:${status}:' + ${JSON.stringify(JSON.stringify(content))};
  function receive(event) {
    if (event.origin !== allowed) return;
    window.opener.postMessage(message, allowed);
    window.removeEventListener('message', receive, false);
  }
  window.addEventListener('message', receive, false);
  if (window.opener) window.opener.postMessage('authorizing:github', allowed);
})();
</script></body></html>`;

const send = (res, code, body, headers = {}) => {
  res.writeHead(code, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store', ...headers });
  res.end(body);
};

createServer(async (req, res) => {
  const url = new URL(req.url ?? '/', `https://${req.headers.host}`);
  const self = `https://${req.headers.host}`;

  try {
    if (url.pathname === '/auth') {
      const target = new URL('https://github.com/login/oauth/authorize');
      target.searchParams.set('client_id', GITHUB_CLIENT_ID);
      target.searchParams.set('redirect_uri', `${self}/callback`);
      target.searchParams.set('scope', url.searchParams.get('scope') || 'repo');
      target.searchParams.set('state', newState());
      return send(res, 302, '', { Location: target.toString() });
    }

    if (url.pathname === '/callback') {
      const code = url.searchParams.get('code');
      if (!code || !validState(url.searchParams.get('state') ?? '')) {
        return send(res, 400, resultPage('error', { message: 'Sign-in expired or was not started here. Try again.' }));
      }
      const response = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ client_id: GITHUB_CLIENT_ID, client_secret: GITHUB_CLIENT_SECRET, code }),
      });
      const data = await response.json();
      if (!data.access_token) {
        return send(res, 401, resultPage('error', { message: data.error_description || 'GitHub did not return a token.' }));
      }
      return send(res, 200, resultPage('success', { token: data.access_token, provider: 'github' }));
    }

    if (url.pathname === '/') return send(res, 200, 'TalentPool365 content manager sign-in service.');
    return send(res, 404, 'Not found');
  } catch (error) {
    console.error(error);
    return send(res, 500, resultPage('error', { message: 'Sign-in failed. Try again.' }));
  }
}).listen(Number(PORT), () => console.log(`cms-auth listening on ${PORT}`));
