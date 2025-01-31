const setRateLimit = require('express-rate-limit');

const AnnonceRateLimiter = setRateLimit({
    windowMs: 1000, 
    max: 10,
    message: "Trop de requêtes, veuillez réessayer plus tard",
    headers: true,
})


module.exports = AnnonceRateLimiter;