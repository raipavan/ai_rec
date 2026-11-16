import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

/* The content manager is a static page in public/admin. Hosts serve
   /admin/ as /admin/index.html on their own; the dev and preview servers
   need telling, or the app's own "page not found" would answer instead. */
const adminIndex = (req: object, _res: unknown, next: () => void) => {
  const request = req as { url?: string };
  if (request.url === '/admin' || request.url === '/admin/') request.url = '/admin/index.html';
  next();
};
const contentManager = (): Plugin => ({
  name: 'content-manager-index',
  configureServer(server) {
    server.middlewares.use(adminIndex);
  },
  configurePreviewServer(server) {
    server.middlewares.use(adminIndex);
  },
});

export default defineConfig({
  plugins: [react(), contentManager()],
  build: {
    assetsDir: 'bundle',
  },
});
