const colors = require('colors')
let bcrypt = require('bcrypt')
const { mongooseConnection } = require('./db')
const { blogs } = require('./data')

// Configuration
require('dotenv').config()
mongooseConnection()

//Models
const BlogsModel = require('./../models/Blogs')

const { emptyDirectory } = require('../utils/files')

// IMPROT DATA SEEDER:
const importData = async () => {
  try {
    //DESTROY FIRST
    await BlogsModel.deleteMany()

    // Empty Uploaded Files
    emptyDirectory('users')

    //IMPORT DATA
    await BlogsModel.insertMany(blogs)

    console.log('Data Inserted'.magenta.inverse)
    process.exit()
  } catch (error) {
    console.log(`Error: ${error}`.red.inverse)
    process.exit(1)
  }
}

// DESTROY DATA SEEDER
const destroyData = async () => {
  try {
    //DESTROY FIRST
    await BlogsModel.deleteMany()

    // Empty Uploaded Files
    emptyDirectory('users')

    console.log('Data Destroyed Successfully'.rainbow.bold)
    process.exit()
  } catch (error) {
    console.log(`Error ${error.message}`.red.bold)
    process.exit(1)
  }
}

// SEEDER COMMAND PREFIXER
if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
