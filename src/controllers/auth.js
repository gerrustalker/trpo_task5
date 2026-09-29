import { Router } from 'express'
import * as IUsers from '../services/users.js'
import { Password as validatePassword, Email as validateEmail, Username as validateUsername } from '../utils/validators.js'
import { createHmac } from "node:crypto"

const app = Router()
app.post("/register", async (req, res) => {
    if(!validateUsername(res, req.body.username) || !validateEmail(res, req.body.email) || !validatePassword(res, req.body.password)) return;
    const hmac = createHmac("sha256", req.body.password)
    hmac.update("supahpass") // i guess i can make it harder but idc rn
    const u = new IUsers.add(req.body.username, req.body.email, hmac.digest("hex"))
})

export default app