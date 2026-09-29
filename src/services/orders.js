import { Order as OrderObj, OrderItem } from "../db.js"

const ORDER_CANCELLED = 0
const ORDER_SETUP = 1
const ORDER_PROCESSING = 2
const ORDER_COMPLETED = 4

class Order {
    // products = {}
    total = 0
    status = ORDER_SETUP
    constructor(id, user, products) {
        this.id = id, this.user = user, this.products = products ?? {}
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

export async function get(id) {
    return await OrderObj.findOne({where: {id}})
}

export async function add(email, password) {
    return await OrderObj.create({email, password})
}