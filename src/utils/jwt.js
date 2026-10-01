import jwt from "jsonwebtoken";

const ACCESS_SECRET = process.env.ACCESS_SECRET ?? "accesskey";
const REFRESH_SECRET = process.env.REFRESH_SECRET ?? "refreshkey";

export const generateTokens = payload => {
    const accessToken = jwt.sign(payload, ACCESS_SECRET, { expiresIn: "15m" });
    const refreshToken = jwt.sign(payload, REFRESH_SECRET, { expiresIn: "7d" });
    return { accessToken, refreshToken };
};

export const verifyAccessToken = token => jwt.verify(token, ACCESS_SECRET);
export const verifyRefreshToken = token => jwt.verify(token, REFRESH_SECRET);

export const refreshAccessToken = refreshToken => {
    try {
        const payload = jwt.verify(refreshToken, REFRESH_SECRET);
        return jwt.sign(payload, ACCESS_SECRET, { expiresIn: "15m" });
    } catch (err) {
        return null;
    }
};

export const refreshRefreshToken = token => jwt.sign(token, REFRESH_SECRET, { expiresIn: "7d" });