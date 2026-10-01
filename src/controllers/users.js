import { Router } from 'express'
import * as IUsers from '../services/users.js'
import { ID as validateID } from '../utils/validators.js'
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

export default app