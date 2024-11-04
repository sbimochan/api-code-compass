import rateLimit from 'express-rate-limit';

/**
 * Set up rate limiter: maximum of 5 requests per minute.
 */
export const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 30,
  message: {
    statusCode: 429,
    error: 'Too Many Requests',
    message: 'You have exceeded the 30 requests in 1 minute limit!'
  },
  headers: true
});
