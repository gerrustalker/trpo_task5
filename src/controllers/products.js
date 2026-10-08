import { Router } from 'express'
import * as IProducts from '../services/products.js'
// import * as IUsers from '../services/users.js'
import { auth } from '../middlewares/auth.js'
import { Access as validateAccess } from '../utils/validators.js'

const app = Router()
app.use(auth)
app.use(async (req, res, next) => {
    // const user = req.user && await IUsers.find({email: req.user.email})
    // if(!user) return res.status(500).json({error: "auth", message: "invalid/no user in middleware???"})
    // const role = IUsers.getRole(user.role)
    // if(!role || !role.sell) return res.status(401).json({error: "auth", message: "no sell access"})
    if(validateAccess(req, res, "sell")) next()
})

app.get("/:id", async (req, res) => {
    const id = Number(req.params.id)
    if(!validateID(res, id)) return;
    const product = await IProducts.get(id)
    // res.status(200).json({id: req.params.id})
})

export default app