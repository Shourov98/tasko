import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';
import {
  makeAccessToken,
  makeRefreshToken,
  verifyRefresh,
} from '../utils/token.generator.js';

const ACCESS_COOKIE_OPTS = {
  httpOnly: true,
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
  maxAge: Number(process.env.ACCESS_TOKEN_TTL_MIN) * 60 * 1000, // ms
};

const REFRESH_COOKIE_OPTS = {
  ...ACCESS_COOKIE_OPTS,
  maxAge: Number(process.env.REFRESH_TOKEN_TTL_DAYS) * 24 * 60 * 60 * 1000,
};

export async function registerUser({ fullName, email, password }) {
  const dup = await User.findOne({ email });
  if (dup) throw new Error('E-mail already registered');

  const user = await User.create({ fullName, email, password });
  return user;
}

export async function loginUser(email, rawPassword) {
  const user = await User.findOne({ email });
  if (!user || !(await user.isPasswordMatch(rawPassword))) {
    throw new Error('Invalid credentials');
  }
  return user;
}

export function issueTokens(res, user, rememberMe = false) {
  const access = makeAccessToken(user);
  res.cookie('accessToken', access, ACCESS_COOKIE_OPTS);

  if (rememberMe) {
    const refresh = makeRefreshToken(user);
    res.cookie('refreshToken', refresh, REFRESH_COOKIE_OPTS);
  }
}

export function clearAuthCookies(res) {
  res.clearCookie('accessToken', ACCESS_COOKIE_OPTS);
  res.clearCookie('refreshToken', REFRESH_COOKIE_OPTS);
}

export async function refreshTokens(res, refreshToken) {
  const payload = verifyRefresh(refreshToken);
  const user = await User.findById(payload.sub);
  if (!user) throw new Error('User not found');

  issueTokens(res, user, true);
  return user;
}
