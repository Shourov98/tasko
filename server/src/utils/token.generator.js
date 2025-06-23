import jwt from 'jsonwebtoken';

const {
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  ACCESS_TOKEN_TTL_MIN = 15,
  REFRESH_TOKEN_TTL_DAYS = 7,
} = process.env;

export const makeAccessToken = (user) =>
  jwt.sign(
    { sub: user.id, email: user.email, points: user.points },
    JWT_ACCESS_SECRET,
    { expiresIn: `${ACCESS_TOKEN_TTL_MIN}m` }
  );

export const makeRefreshToken = (user) =>
  jwt.sign(
    { sub: user.id },
    JWT_REFRESH_SECRET,
    { expiresIn: `${REFRESH_TOKEN_TTL_DAYS}d` }
  );

export const verifyAccess = (token) =>
  jwt.verify(token, JWT_ACCESS_SECRET);

export const verifyRefresh = (token) =>
  jwt.verify(token, JWT_REFRESH_SECRET);
