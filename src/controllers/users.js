import { Router } from 'express'
import IUsers from '../services/users.js'
import { ID as validateID } from '../utils/validators.js'

const app = Router()
app.get("/:id", (req, res) => {
    const id = Number(req.params.id)
    if(!validateID(res, id)) return;
    const user = IUsers.get(id)
    if(user) res.status(200).json(user); else res.status(404).json({error: "users", message: "not found"})
    // res.status(200).json({id: req.params.id})
})

export default app