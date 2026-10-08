import * as IUsers from '../services/users.js'

export function ID(res, id) {
    if(!id || Number.isNaN(id) || !Number.isInteger(id)) return false, res.status(400).json({error: "id", message: "invalid id"});
    return true
}

const ueregexp = /^[A-Za-z0-9_\-.+]+$/
export function Username(res, username) {
    if(!username || username.length < 3 || !ueregexp.test(username)) return false, res.status(400).json({error: "username", message: "invalid username"});
    return true
}

const eregexp = /^[A-Za-z0-9_\-.]+@[A-Za-z0-9\-_.]+$/
export function Email(res, email) {
    if(!email || !eregexp.test(email)) return false, res.status(400).json({error: "email", message: "invalid email"});
    return true
}

export function Password(res, password) {
    if(!password || password.length < 5) return false, res.status(400).json({error: "password", message: "too short"});
    return true
}

export async function Access(req, res, access) {
    const user = req.user && await IUsers.find({email: req.user.email})
    if(!user) return false, res.status(500).json({error: "auth", message: "invalid/no user in middleware???"})
    const role = IUsers.getRole(user.role)
    if(!role || !role[access]) return false, res.status(401).json({error: "auth", message: `no ${access} access`})
    return true
}