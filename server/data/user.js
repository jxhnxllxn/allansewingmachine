const bcrypt = require('bcryptjs')

const users = [
  {
    name: 'John Allen de Chavez',
    email: 'johnallendechavez23@gmail.com',
    password: bcrypt.hashSync('johnjohn', 10),
    address: {
      unit: '19',
      street: 'San Felipe',
      city: 'Padre Garcia',
      state: 'Batangas',
      country: 'Philippines',
      zipcode: '4224',
    },
    contact: '09352213921',
    role: 'admin',
  },
  {
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    password: bcrypt.hashSync('johnjohn', 10),
    address: {
      unit: '19',
      street: 'San Felipe',
      city: 'Padre Garcia',
      state: 'Batangas',
      country: 'Philippines',
      zipcode: '4224',
    },
    contact: '09352213921',
    role: 'user',
  },
  {
    name: 'Jane Doe',
    email: 'janedoe@gmail.com',
    password: bcrypt.hashSync('johnjohn', 10),
    address: {
      unit: '19',
      street: 'San Felipe',
      city: 'Padre Garcia',
      state: 'Batangas',
      country: 'Philippines',
      zipcode: '4224',
    },
    contact: '09352213921',
    role: 'user',
  },
]

module.exports = users
