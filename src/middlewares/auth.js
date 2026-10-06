import { verifyAccessToken } from "../utils/jwt.js"

export function auth(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1] ?? req.cookies?.accessToken
    if (!token) return res.sendStatus(401)

    try {
        const user = verifyAccessToken(token)
        req.user = user
        next()
    } catch {
        res.sendStatus(403)
    }
}