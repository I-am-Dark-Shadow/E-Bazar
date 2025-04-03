import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

//create a connection to the database -> you can also
//create a separate file for this and import it here this is the best practice

if (!process.env.MONGO_URL) {
    throw new Error('MONGO_URL is not defined in the .env file')
}
async function connectDB() {
    try {
       await mongoose.connect(process.env.MONGO_URL)
            .then(() => {
                console.log('Connected to DB')
            })
            .catch((err) => {
                console.log('Error connecting to DB', err)
            })
    }
    catch (error) {
        console.log("MongoDB Connection Failed", error)
        process.exit(1) // exit with failure
    }
}

export default connectDB
