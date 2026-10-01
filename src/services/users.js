import { User as UserObj } from "../db.js"

class User {
    constructor(id, username, email) {
        this.id = id, this.username = username, this.email = email
        db.users.push(this)
    }
    setupOrder() {
        return new Order(db.orders.length, this)
    }
}

export async function get(id) {
    return await UserObj.findOne({where: {id}})
}

export async function find(obj) {
    return await UserObj.findOne({where: obj})
}

export async function add(username, email, password) {
    return await UserObj.create({username, email, password})
}