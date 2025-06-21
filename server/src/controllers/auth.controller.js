import {
  registerUser,
  loginUser,
  issueTokens,
  refreshTokens,
  clearAuthCookies,
} from "../services/auth.service.js";

export async function signup(req, res) {
  try {
    const { fullName, email, password } = req.body;
    const user = await registerUser({ fullName, email, password });
    issueTokens(res, user, false);
    res.status(201).json({ id: user.id, fullName, email, points: user.points });
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
}

export async function login(req, res) {
  try {
    const { email, password, rememberMe } = req.body;
    const user = await loginUser(email, password);
    issueTokens(res, user, rememberMe);
    res.json({ id: user.id, fullName: user.fullName, email, points: user.points });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
}

export async function refresh(req, res) {
  try {
    const token = req.cookies?.refreshToken;
    if (!token) return res.status(401).json({ message: "No refresh token" });
    const user = await refreshTokens(res, token);
    res.json({ id: user.id, fullName: user.fullName, email: user.email, points: user.points });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
}

export function logout(req, res) {
  clearAuthCookies(res);
  res.status(204).end();
}
