// /* eslint-disable */
// // This optional code is used to register a service worker.
// // register() is not called by default.

// // This lets the app load faster on subsequent visits in production, and gives
// // it offline capabilities. However, it also means that developers (and users)
// // will only see deployed updates on subsequent visits to a page, after all the
// // existing tabs open on the page have been closed, since previously cached
// // resources are updated in the background.

// // To learn more about the benefits of this model and instructions on how to
// // opt-in, read http://bit.ly/CRA-PWA

// const isLocalhost = Boolean(
//   window.location.hostname === 'localhost' ||
//   // [::1] is the IPv6 localhost address.
//   window.location.hostname === '[::1]' ||
//   // 127.0.0.1/8 is considered localhost for IPv4.
//   window.location.hostname.match(
//     /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
//   )
// );

// export function register(config) {
//   if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
//     // The URL constructor is available in all browsers that support SW.
//     const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
//     if (publicUrl.origin !== window.location.origin) {
//       // Our service worker won't work if PUBLIC_URL is on a different origin
//       // from what our page is served on. This might happen if a CDN is used to
//       // serve assets; see https://github.com/facebook/create-react-app/issues/2374
//       return;
//     }

//     window.addEventListener('load', () => {
//       const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

//       if (isLocalhost) {
//         // This is running on localhost. Let's check if a service worker still exists or not.
//         checkValidServiceWorker(swUrl, config);

//         // Add some additional logging to localhost, pointing developers to the
//         // service worker/PWA documentation.
//         navigator.serviceWorker.ready.then(() => {
//           console.log(
//             'This web app is being served cache-first by a service ' +
//             'worker. To learn more, visit http://bit.ly/CRA-PWA'
//           );
//         });
//       } else {
//         // Is not localhost. Just register service worker
//         registerValidSW(swUrl, config);
//       }
//     });
//   }
// }

// function registerValidSW(swUrl, config) {
//   navigator.serviceWorker
//     .register(swUrl)
//     .then(registration => {
//       registration.onupdatefound = () => {
//         const installingWorker = registration.installing;
//         if (installingWorker == null) {
//           return;
//         }
//         installingWorker.onstatechange = () => {
//           if (installingWorker.state === 'installed') {
//             if (navigator.serviceWorker.controller) {
//               // At this point, the updated precached content has been fetched,
//               // but the previous service worker will still serve the older
//               // content until all client tabs are closed.
//               console.log(
//                 'New content is available and will be used when all ' +
//                 'tabs for this page are closed. See http://bit.ly/CRA-PWA.'
//               );

//               // Execute callback
//               if (config && config.onUpdate) {
//                 config.onUpdate(registration);
//               }
//             } else {
//               // At this point, everything has been precached.
//               // It's the perfect time to display a
//               // "Content is cached for offline use." message.
//               console.log('Content is cached for offline use.');

//               // Execute callback
//               if (config && config.onSuccess) {
//                 config.onSuccess(registration);
//               }
//             }
//           }
//         };
//       };
//     })
//     .catch(error => {
//       console.error('Error during service worker registration:', error);
//     });
// }

// function checkValidServiceWorker(swUrl, config) {
//   // Check if the service worker can be found. If it can't reload the page.
//   fetch(swUrl)
//     .then(response => {
//       // Ensure service worker exists, and that we really are getting a JS file.
//       const contentType = response.headers.get('content-type');
//       if (
//         response.status === 404 ||
//         (contentType != null && contentType.indexOf('javascript') === -1)
//       ) {
//         // No service worker found. Probably a different app. Reload the page.
//         navigator.serviceWorker.ready.then(registration => {
//           registration.unregister().then(() => {
//             window.location.reload();
//           });
//         });
//       } else {
//         // Service worker found. Proceed as normal.
//         registerValidSW(swUrl, config);
//       }
//     })
//     .catch(() => {
//       console.log(
//         'No internet connection found. App is running in offline mode.'
//       );
//     });
// }

// export function unregister() {
//   if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.ready.then(registration => {
//       registration.unregister();
//     });
//   }
// }



// const CACHE_NAME = 'app-cache-v1';
// const VERSION_URL = '/version';

// async function checkVersionAndUpdate() {
//   console.log('inside version');

//   try {
//     const response = await fetch(VERSION_URL);
//     const { version } = await response.json();
//     const cachedVersion = await caches.match(VERSION_URL);
//     const cachedVersionText = cachedVersion && (await cachedVersion.text());
//     console.log('version', version);
//     console.log('cachedVersionText', cachedVersionText);


//     if (version !== cachedVersionText) {
//       // If version mismatch, clear cache and reload
//       const cacheKeys = await caches.keys();
//       await Promise.all(cacheKeys.map((key) => caches.delete(key)));
//       self.skipWaiting();
//       self.clients.matchAll({ type: 'window' }).then((clients) => {
//         clients.forEach((client) => client.navigate(client.url));
//       });
//     }
//   } catch (err) {
//     console.error('Error checking version:', err);
//   }
// }

// self.addEventListener('install', (event) => {
//   event.waitUntil(self.skipWaiting());
// });

// self.addEventListener('activate', (event) => {
//   event.waitUntil(
//     caches.keys().then((cacheNames) =>
//       Promise.all(
//         cacheNames.map((cacheName) => caches.delete(cacheName))
//       )
//     )
//   );
//   self.clients.claim();
// });

// self.addEventListener('fetch', (event) => {
//   if (event.request.url.includes(VERSION_URL)) {
//     event.respondWith(fetch(event.request));
//     return;
//   }
//   event.respondWith(
//     caches.match(event.request).then((response) => {
//       return response || fetch(event.request);
//     })
//   );
// });

// setInterval(checkVersionAndUpdate, 30000); // Check every 60 seconds


// export function register() {
//   if ('serviceWorker' in navigator) {
//     navigator.serviceWorker
//       .register('/service-worker.js')
//       .then((registration) => {
//         console.log('Service Worker registered:', registration);
//       })
//       .catch((error) => {
//         console.error('Service Worker registration failed:', error);
//       });
//   }
// }


// "build": "vite build && echo {\"version\" : \" + (Get-Date -UFormat %s) + '\"} > dist/version.json",

//     "build": "vite build && powershell -Command \"echo '{\"\"version\"\":\"\"' + (Get-Date -UFormat %s) + '\"\", \"\"buildDate\"\":\"\"' + (Get-Date -Format o) + '\"\"}' > dist/version.json\"",



// {
//     host: 'd29ou1g6v80ekb.cloudfront.net',
//     'user-agent': 'DuckDuckBot/1.1; (+http://duckduckgo.com/duckduckbot.html)',
//     'x-amz-cf-id': 'gkR-8raprJ1gLRxTpjwGSRxuYVItH6IlB-mMnbMJf2Cc73RbejsnqA==',
//     connection: 'Keep-Alive',
//     'cloudfront-is-mobile-viewer': 'false',
//     'cloudfront-is-tablet-viewer': 'false',
//     'cloudfront-is-smarttv-viewer': 'false',
//     'cloudfront-is-desktop-viewer': 'true',
//     'cloudfront-is-ios-viewer': 'false',
//     'cloudfront-is-android-viewer': 'false',
//     'accept-language': 'en-US,en;q=0.8,zh;q=0.6,es;q=0.4',
//     accept: '*/*',
//     referer: 'http://d29ou1g6v80ekb.cloudfront.net/favicon.ico',
//     te: 'trailers',
//     'cloudfront-forwarded-proto': 'http',
//     'x-forwarded-for': '40.88.21.235',
//     via: '1.1 8b91488fa62e73ed6328bc389e6d1cbe.cloudfront.net (CloudFront)',
//     'accept-encoding': 'gzip',
//     'cloudfront-viewer-http-version': '1.1',
//     'cloudfront-viewer-country': 'US',
//     'cloudfront-viewer-country-name': 'United States',
//     'cloudfront-viewer-country-region': 'VA',
//     'cloudfront-viewer-country-region-name': 'Virginia',
//     'cloudfront-viewer-city': 'Washington',
//     'cloudfront-viewer-postal-code': '22747',
//     'cloudfront-viewer-time-zone': 'America/New_York',
//     'cloudfront-viewer-metro-code': '511',
//     'cloudfront-viewer-latitude': '38.70950',
//     'cloudfront-viewer-longitude': '-78.15390',
//     'cloudfront-viewer-address': '40.88.21.235:3139',
//     'cloudfront-viewer-asn': '8075'
//   }