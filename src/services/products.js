import { Product } from "../db.js"

class Product {
    constructor(id, name, article, price) {
        this.id = id, this.name = name, this.article = article, this.price = price
        db.products.push(this)
    }
}

export async function get(id) {
    return await Product.findOne({where: {id}})
}

export async function add(email, password) {
    return await Product.create({email, password})
}