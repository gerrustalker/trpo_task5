import { Router } from 'express'
import IUsers from '../services/users.js'
import { Password as validatePassword, Email as validateEmail } from '../utils/validators.js'
import { createHMAC } from "crypto"

const app = Router()
app.post("/register", (req, res) => {
    if(!validateEmail(res, req.body.email) || !validatePassword(res, req.body.password)) return;
    const hmac = createHMAC("sha256", req.body.password)
    hmac.update("supahpass") // i guess i can make it harder but idc rn
    IUsers.add(req.body.email, hmac.digest("hex"))
})

export default app