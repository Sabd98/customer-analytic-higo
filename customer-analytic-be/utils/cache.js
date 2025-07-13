const LRU = require("lru-cache");

// Konfigurasi cache berbasis LRU (Least Recently Used)
const cache = new LRU({
  max: 512 * 1024 * 1024, // Batas memori 512MB
  length: (item, key) => key.length + item.length, // Hitung ukuran memori
  maxAge: 1000 * 3600, // TTL default 1 jam (dalam ms)
});

// Middleware caching yang dioptimalkan
const cacheMiddleware = (duration) => {
  return (req, res, next) => {
    // Generate cache key yang unik (method + URL + query + user context)
    const userContext = req.user ? `:${req.user.id}` : "";
    const key = `${req.method}:${req.originalUrl}${userContext}`;

    // 1. Cek cache dengan lock stampede prevention
    const cachedData = cache.get(key);

    if (cachedData) {
      // Handle temporary lock untuk cache stampede
      if (cachedData === "FETCHING") {
        return next(); // Lewati cache untuk request parallel
      }
      return res.send(cachedData);
    }

    // 2. Set temporary lock
    cache.set(key, "FETCHING", 10000); // Lock 10 detik

    // 3. Override res.send untuk caching selektif
    res.originalSend = res.send;
    res.send = function (body) {
      // Hanya cache response sukses (2xx)
      if (this.statusCode >= 200 && this.statusCode < 300) {
        // Hitung durasi sebenarnya
        const cacheDuration =
          typeof duration === "function" ? duration(req, res) : duration;

        cache.set(key, body, cacheDuration * 1000); // Convert to ms
      }
      res.originalSend(body);
    };

    next();
  };
};

// Fungsi untuk reset cache tertentu
const purgeCache = (pattern) => {
  const keys = cache.keys();
  keys.forEach((key) => {
    if (key.match(pattern)) {
      cache.del(key);
    }
  });
};

module.exports = {
  cache,
  cacheMiddleware,
  purgeCache,
};
// const NodeCache = require("node-cache");

// // Create cache instance with 1 hour TTL by default
// const cache = new NodeCache({
//   stdTTL: 3600,
//   checkperiod: 600,
// });

// // Middleware for caching
// const cacheMiddleware = (duration) => {
//   return (req, res, next) => {
//     const key = req.originalUrl;
//     const cachedResponse = cache.get(key);

//     if (cachedResponse) {
//       res.send(cachedResponse);
//     } else {
//       res.originalSend = res.send;
//       res.send = (body) => {
//         cache.set(key, body, duration);
//         res.originalSend(body);
//       };
//       next();
//     }
//   };
// };

// module.exports = {
//   cache,
//   cacheMiddleware,
// };
