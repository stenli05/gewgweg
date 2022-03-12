import { ObjectId } from "mongodb"
const dbName = "HTT"
const coll = "Locations"
let db

export async function getDb(client) {
    db = await client.db(dbName)
}
export async function getAllDocs() {
    return await db.collection(coll).find().toArray()
}
export async function addDoc(doc) {
    return await db.collection(coll).insertOne(doc)
}
export async function deleteDoc(id) {
    const filter = { _id: new ObjectId(id) }
    return await db.collection(coll).deleteOne(filter)
}