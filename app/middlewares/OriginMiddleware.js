const cors = require('cors');

import env from '@/config/env.js';

class OriginMiddleware {
  static allowed_origins = [
    env.frontend_api,
    'https://my-portfolio-rho-gules.vercel.app',
  ];

  static cors_options = {
    origin: (origin, callback) => {
      if (OriginMiddleware.allowed_origins.some(allowed_origin => origin && origin.startsWith(allowed_origin))) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  };

  constructor(req, res, next) {
    const origin = req.headers.origin || req.headers.referer;

    // Menangani preflight requests (OPTIONS)
    if (req.method === 'OPTIONS') {
      this.set_cors_headers(req, res, () => {
        res.sendStatus(204);
      });
      return;
    }

    if (origin && OriginMiddleware.allowed_origins.some(allowed_origin => origin.startsWith(allowed_origin))) {
      // Jika origin/referer sesuai dengan salah satu domain yang diizinkan, lanjutkan ke endpoint berikutnya
      cors(OriginMiddleware.cors_options)(req, res, next);
    } else {
      // Jika tidak, tolak akses dengan status 403 (Forbidden)
      res.status(403).json({ message: `Access forbidden: You are not allowed to access this resource. Allowed origins: ${OriginMiddleware.allowed_origins.join(', ')}` });
    }
  }

  set_cors_headers(req, res, next) {
    const origin = req.headers.origin || req.headers.referer;
    if (origin && OriginMiddleware.allowed_origins.some(allowed_origin => origin.startsWith(allowed_origin))) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  }
}

module.exports = (req, res, next) => new OriginMiddleware(req, res, next);
