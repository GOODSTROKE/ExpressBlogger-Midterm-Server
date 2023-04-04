const faker = require('faker')

function getRandomAvatar() {
  let type = ['men', 'women']

  // Generate a random index based on the length of the array
  const randomTypeIndex = Math.floor(Math.random() * type.length)

  // Generate random data within [0-50]
  const randomAge = Math.floor(Math.random() * 50)

  //Generate random user avatar from randomuser.me
  let avatar = `https://randomuser.me/api/portraits/${type[randomTypeIndex]}/${randomAge}.jpg`

  return avatar
}

function getRandomName() {
  return faker.name.findName()
}

function getDescription() {
  return faker.lorem.paragraph(30)
}

function getTitle() {
  return faker.lorem.sentence()
}

module.exports = { getRandomAvatar, getRandomName, getDescription, getTitle }

//---------------------What can be possible using faker---------------
// Generate a random name
// const firstName = faker.name.firstName()
// const lastName = faker.name.lastName()
// const fullName = faker.name.findName()

// Generate a random address
// const streetAddress = faker.address.streetAddress()
// const city = faker.address.city()
// const state = faker.address.state()
// const country = faker.address.country()
// const zipCode = faker.address.zipCode()

// Generate a random phone number
// const phoneNumber = faker.phone.phoneNumber()

// Generate a random email address
// const email = faker.internet.email()

// Generate a random credit card number
// const creditCardNumber = faker.finance.creditCardNumber()

// Generate a random color
// const colorName = faker.commerce.color()
// const hexColor = faker.internet.color()

// Generate a random sentence
// const sentence = faker.lorem.sentence()

// Generate a random file name
// const fileName = faker.system.fileName()
