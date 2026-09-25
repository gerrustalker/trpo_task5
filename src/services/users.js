import { User } from "../db.js"

export async function get(id) {
    return await User.findOne({where: {id}})
}

export async function add(email, password) {
    return await User.create({email, password})
}