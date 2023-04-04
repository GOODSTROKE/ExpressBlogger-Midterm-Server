// Required Packeges
let mongoose = require('mongoose')
let uniqueValidator = require('mongoose-unique-validator')
const {
  getRandomAvatar,
  getRandomName,
  getDescription,
} = require('../utils/dummyData')

const BlogsSchema = mongoose.Schema(
  {
    title: { type: String, require: true },
    description: { type: String, default: getDescription() },
    bannar: { type: String, default: 'demo_bannar.png' },
    author: { type: String, default: getRandomName() },
    avatar: { type: String, default: getRandomAvatar() },
  },
  { timestamps: true, versionKey: false }
)
//

// Integrate MOngoose Unique Validoator Plugin
BlogsSchema.plugin(uniqueValidator, {
  message: '{VALUE} Already Exists!',
})

// Make Modelresult
const Blogs = mongoose.model('Blogs', BlogsSchema)

// Export Model
module.exports = Blogs
