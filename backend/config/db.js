import mongoose from 'mongoose'

const connectDB = async () => {
    try {

        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,//this useUnifiedTopology has been depricated
            useNewUrlParser: true,//this useNewUrlParser has been depricated
            // useCreateIndex: true//this useCreateIndex has been depricated
        })


        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
    } catch (error) {
        console.error(`Error:${error.message}`.red.underline)
        process.exit(1)
    }
}

export default connectDB