import express from "express"
import cors from "cors"
import database from './database.js'
import { getDb, getAllDocs } from './dbFunctions.js'
const port = 3000

const app = express()
app.use(cors())
app.use(express.static("web"))
app.use(express.json())

// The route definitions for get

app.get("/data", async (req, res) => {	
	const arr = await getAllDocs()
	res.send(arr)
})

// pp.post("/new_place", async (req, res) => {
//     newPlace = req.body
//     await addDoc(newPlace)
// })

// Start the web server and connect to the database

let server
let conn

(async () => {
	try {
		conn = await database()
		await getDb(conn)
		server = app.listen(port, () => {
			console.log("# App server listening on port " + port)
		})
	}
	catch(err) {
		console.error("# Error:", err)
		console.error("# Exiting the application.")
		await closing()
		process.exit(1)
	}
})()

async function closing() {
	console.log("# Closing resources...")
	if (conn) {
		await conn.close()
		console.log("# Database connection closed.")
	}
	if (server) {
		server.close(() => console.log("# Web server stopped."))
	}
}