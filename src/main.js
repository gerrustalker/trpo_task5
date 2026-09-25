import express from "express"
import cors from "cors"
import fs from "fs/promises"

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
app.get("/", (req, res) => res.status(200).send("hi"))

const db = {products: [], orders: [], users: []} // temp?

class Product {
    constructor(id, name, article, price) {
        this.id = id, this.name = name, this.article = article, this.price = price
        db.products.push(this)
    }
}

const ORDER_CANCELLED = 0
const ORDER_SETUP = 1
const ORDER_PROCESSING = 2
const ORDER_COMPLETED = 4

class Order {
    products = {}
    total = 0
    status = ORDER_SETUP
    constructor(id, user) {
        this.id = id, this.user = user
        db.orders.push(this)
    }
    addProduct(product, amount) {
        products[product] = products[product] ? (products[product] + amount) : amount
    }
    removeProduct(product, amount) {
        const n = products[product]
        if(n && n >= amount) {
            products[product] = amount;
            if(n === 0) delete products[product]
        }
    }
    process() {
        this.status = ORDER_PROCESSING
        // <...> payment systems and shit
    }
    complete() {
        this.status = ORDER_COMPLETED
    }
    cancel() {
        this.status = ORDER_CANCELLED
    }
}

class User {
    constructor(id, username, email) {
        this.id = id, this.username = username, this.email = email
        db.users.push(this)
    }
    setupOrder() {
        return new Order(db.orders.length, this)
    }
}

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

import rusers from "./controllers/users.js"
app.use("/users", rusers)

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})