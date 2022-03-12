import { MongoClient } from "mongodb"
const uri = "mongodb+srv://Hacktues:Lo6PvbkvwAOAuC3I@cluster0.z9xqf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const connect = async () => {
	try {
		console.log("# Connecting to database server...")
		const client = await MongoClient.connect(uri)
		console.log("# Connected")
		return client
	}
	catch(err) {
		console.error("# Database connection error")
		throw err
	}
}

export default connect;