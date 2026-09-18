import express from 'express'

const app = express.Router()
app.get("/:id", (req, res) => {
    res.status(200).json({id: req.params.id})
})

export default app