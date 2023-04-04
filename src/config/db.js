// Required Packeges
const mongoose = require('mongoose')

mongoose.set('strictQuery', true)

/**
 * @description: Connect to MongoDB
 * @connection
 */
const mongooseConnection = async () => {
  try {
    const OPTIONS = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      user: '',
      pass: '',
    }
    let db = await mongoose.connect(process.env.MONGO_ATLUS, OPTIONS)
    console.log(
      `MongoDB Successfully Connected with ${mongoose.connection.name}`.green
        .bold
    )
  } catch (error) {
    console.log(`Error ${error.message}`.red.bold)
    process.exit(1)
  }
}

// Module Exports:
module.exports = { mongooseConnection }
