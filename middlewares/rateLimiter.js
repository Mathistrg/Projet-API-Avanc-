const setRateLimit = require('express-rate-limit');

const AnnonceRateLimiter = setRateLimit({
    windowMs: 1000, 
    max: 10,
    message: "too many request, try later...",
    headers: true,
})


module.exports = AnnonceRateLimiter;