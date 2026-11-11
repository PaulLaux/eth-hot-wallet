// Earlier builds installed an offline-plugin service worker at this path, which keeps
// serving the cached old app. This replacement removes it and reloads open tabs.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => {
  self.registration.unregister()
    .then(() => self.clients.matchAll({ type: 'window' }))
    .then((clients) => clients.forEach((client) => client.navigate(client.url)));
});
