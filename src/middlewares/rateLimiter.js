import rateLimit from 'express-rate-limit';

/**
 * Set up rate limiter: maximum of 5 requests per minute
 */
export const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute duration
  max: 5, // limit each IP to 5 requests per windowMs
  message: {
    statusCode: 429,
    error: 'Too Many Requests',
    message: 'You have exceeded the 5 requests in 1 minute limit!'
  },
  headers: true
});
