import { Router } from 'express'
import * as IUsers from '../services/users.js'
import { Password as validatePassword, Email as validateEmail, Username as validateUsername } from '../utils/validators.js'
import { createHmac } from "node:crypto"
import { generateTokens } from "../utils/jwt.js"

const HASH_SALT = "supahpass"

const app = Router()
app.post("/register", async (req, res) => {
    const {username, email, password} = req.body
    if(!validateUsername(res, username) || !validateEmail(res, email) || !validatePassword(res, password)) return;
    if(await IUsers.find({email}) ?? await IUsers.find({username}))
        return res.status(400).json({error: "auth", message: "user already exists"})
    const hmac = createHmac("sha256", password)
    hmac.update(HASH_SALT) // i guess i can make it harder but idc rn
    const u = await IUsers.add(username, email, hmac.digest("hex"))
    const tokens = generateTokens({email, password})
    res.status(200).json({success: true, tokens, id: u.id ?? u._id})
})

app.post("/login", async (req, res) => {
    const {email, password} = req.body
    if(!validateEmail(res, email)) return;
    const user = await IUsers.find({email})
    if(!user)
        return res.status(400).json({error: "auth", message: "user does not exist"})
    const hmac = createHmac("sha256", password)
    hmac.update(HASH_SALT) // i guess i can make it harder but idc rn
    if(user.password !== hmac.digest("hex")) return res.status(401).json({error: "auth", message: "wrong password"})
    const tokens = generateTokens({email, password})
    res.status(200).json({success: true, tokens, id: user.id ?? user._id})
})

export default app