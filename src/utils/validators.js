export function ID(res, id) {
    if(!id || Number.isNaN(id)) return false, res.status(400).json({error: "id", message: "invalid id"});
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