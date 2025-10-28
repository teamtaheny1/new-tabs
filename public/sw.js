// Service Worker for New Tab Page
// Provides offline support and faster loading through caching

const CACHE_VERSION = 'v1.0.0';
const CACHE_NAME = `newtab-cache-${CACHE_VERSION}`;

// Assets to cache immediately on install
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/wallpapers.json'
];

// Cache strategies
const CACHE_STRATEGIES = {
  CACHE_FIRST: 'cache-first',
  NETWORK_FIRST: 'network-first',
  STALE_WHILE_REVALIDATE: 'stale-while-revalidate'
};

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting()) // Activate immediately
  );
});

// Activate event - cleanup old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name.startsWith('newtab-cache-') && name !== CACHE_NAME)
            .map((name) => {
              console.log('[SW] Deleting old cache:', name);
              return caches.delete(name);
            })
        );
      })
      .then(() => self.clients.claim()) // Take control immediately
  );
});

// Fetch event - serve from cache with appropriate strategy
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Only handle same-origin requests
  if (url.origin !== location.origin) {
    // For external favicons, use network with timeout
    if (request.destination === 'image') {
      event.respondWith(fetchWithTimeout(request, 3000));
    }
    return;
  }
  
  // Determine caching strategy based on request type
  if (url.pathname.startsWith('/wallpapers/')) {
    // Images: Cache first (they don't change often)
    event.respondWith(cacheFirst(request));
  } else if (url.pathname.startsWith('/api/')) {
    // API: Stale while revalidate (fast response + background update)
    event.respondWith(staleWhileRevalidate(request));
  } else if (url.pathname === '/' || url.pathname === '/index.html') {
    // HTML: Network first (ensure fresh content)
    event.respondWith(networkFirst(request));
  } else {
    // Everything else: Stale while revalidate
    event.respondWith(staleWhileRevalidate(request));
  }
});

// Cache First Strategy - serve from cache, fallback to network
async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) {
    return cached;
  }
  
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.error('[SW] Cache first failed:', error);
    return new Response('Offline', { status: 503 });
  }
}

// Network First Strategy - try network, fallback to cache
async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cached = await caches.match(request);
    if (cached) {
      return cached;
    }
    console.error('[SW] Network first failed:', error);
    return new Response('Offline', { status: 503 });
  }
}

// Stale While Revalidate - serve from cache immediately, update in background
async function staleWhileRevalidate(request) {
  const cached = await caches.match(request);
  
  const fetchPromise = fetch(request).then((response) => {
    if (response.ok) {
      const cache = caches.open(CACHE_NAME);
      cache.then((c) => c.put(request, response.clone()));
    }
    return response;
  }).catch((error) => {
    console.error('[SW] Stale while revalidate fetch failed:', error);
  });
  
  // Return cached version immediately if available
  return cached || fetchPromise;
}

// Fetch with timeout for external resources
async function fetchWithTimeout(request, timeout = 3000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(request, {
      signal: controller.signal,
      mode: 'no-cors' // Allow cross-origin favicon requests
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    // Return a transparent 1x1 pixel as fallback for images
    if (request.destination === 'image') {
      return new Response(
        new Blob([new Uint8Array([
          0x47, 0x49, 0x46, 0x38, 0x39, 0x61, 0x01, 0x00, 0x01, 0x00,
          0x80, 0x00, 0x00, 0xff, 0xff, 0xff, 0x00, 0x00, 0x00, 0x21,
          0xf9, 0x04, 0x01, 0x00, 0x00, 0x00, 0x00, 0x2c, 0x00, 0x00,
          0x00, 0x00, 0x01, 0x00, 0x01, 0x00, 0x00, 0x02, 0x02, 0x44,
          0x01, 0x00, 0x3b
        ])], { type: 'image/gif' })
      );
    }
    throw error;
  }
}

// Message handler for cache management
self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.delete(CACHE_NAME)
        .then(() => {
          console.log('[SW] Cache cleared');
        })
    );
  }
});
