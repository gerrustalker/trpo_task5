import express from "express"
import cors from "cors"
import fs from "fs/promises"
import path from "path"
import cookieParser from "cookie-parser"

const app = express()
const baddies = new Map()
app.use((req, res, next) => {
    const n = (baddies.get(req.ip) ?? 0) + 1
    if(n >= 5) res.status(429).send("too many requests")
    else {baddies.set(req.ip, n); next()}
})
setInterval(() => {
    baddies.clear()
}, 10000);
app.use(express.json())

app.use((req, _, next) => {
    console.log(`[${new Date().toUTCString()}] [${req.method}] ${req.url}`)
    next()
})
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:3000"]
}))
// app.get("/", (req, res) => res.status(200).send("hi"))

app.use(express.static(path.join(import.meta.dirname, "../public")))
app.use(cookieParser());

const db = {products: [], orders: [], users: []} // temp?

const api = express.Router()
api.post('/register', (req, res) => {
    
})
app.use("/api", api)

const admin = express.Router()
admin.use((req, res, next) => {if(!req.get("authorization")) return res.status(401).send("nope"); next()})
admin.get("/", (req, res) => res.status(200).send("you made it to /admin"))
app.use("/admin", admin)

app.post("/echo", (req, res) => res.json(req.body))

app.get("/search", (req, res) => {
    const q = req.query.q
    if(!q || q.trim() === "") return res.status(400).json({error: "search", message: "no query"})
    res.status(200).json({query: q})
})

import rauth from "./controllers/auth.js"
app.use("/auth", rauth)

import rusers from "./controllers/users.js"
app.use("/users", rusers)

import rproducts from "./controllers/products.js"
app.use("/products", rproducts)

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})

