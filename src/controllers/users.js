import { Router } from 'express'
import * as IUsers from '../services/users.js'
import { ID as validateID, Access as validateAccess } from '../utils/validators.js'
import { auth } from '../middlewares/auth.js'

const app = Router()
app.use(auth)
app.get("/:id", async (req, res) => {
    const id = Number(req.params.id)
    if(!validateID(res, id)) return;
    const user = await IUsers.get(id)
    if(user && user.id) res.status(200).json({id: user.id, name: user.username}); else res.status(404).json({error: "users", message: "not found"})
    // res.status(200).json({id: req.params.id})
})

app.delete("/delete/:id", async (req, res) => {
    const {id} = req.body
    if(!validateID(res, id)) return;
    const user = await IUsers.find({id})
    if(!user) return res.status(400).json({error: "auth", message: "user does not exist"})
    const auser = req.user
    if(user.email !== auser.email && !validateAccess(req, res, "deleteUsers")) return
    IUsers.markDeletion(id)
})

export default app