import express from 'express';
import cors from 'cors';
import { expressjwt as jwt } from 'express-jwt';
import jwksRsa from 'jwks-rsa';

const app = express();
app.use(cors());
app.use(express.json());

// Auth0 config
const authConfig = {
  domain: 'dev-ettqxdag4t56suua.us.auth0.com',
  audience: 'https://eventfinder/api', // Set this in Auth0 API settings
};

// JWT middleware
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
  }),
  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithms: ['RS256']
});

// Example protected route
app.get('/api/protected', checkJwt, (req, res) => {
  res.json({ message: 'You are authenticated!', user: req.auth });
});

app.listen(4000, () => console.log('API listening on http://localhost:4000'));