import { Product as ProductObj } from "../db.js"

class Product {
    constructor(id, name, article, price) {
        this.id = id, this.name = name, this.article = article, this.price = price
        db.products.push(this)
    }
}

export async function get(id, wd) {
    return await ProductObj.findOne({where: {id, isDeleted: wd ? undefined : false}})
}

export async function add(email, password) {
    return await ProductObj.create({email, password})
}