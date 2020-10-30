const bcrypt = require('bcryptjs');

const users = [
    {
        name:'John Allen de Chavez',
        email:'johnallendechavez23@gmail.com',
        address:{
            unit:'19',
            street:'San Felipe',
            city:'Padre Garcia',
            state:'Batangas',
            country:'Philippines',
            zipcode:'4224'
        },
        contact:'09352213921',
        role:'admin',
        password:bcrypt.hashSync('johnjohn',10),
    },
    {
        name:'John Doe',
        email:'johDoe@gmail.com',
        address:{
            unit:'19',
            street:'San Felipe',
            city:'Padre Garcia',
            state:'Batangas',
            country:'Philippines',
            zipcode:'4224'
        },
        contact:'09352213921',
        password:bcrypt.hashSync('johnjohn',10),
    },
    {
        name:'Jane Doe',
        email:'janedoe@gmail.com',
        address:{
            unit:'19',
            street:'San Felipe',
            city:'Padre Garcia',
            state:'Batangas',
            country:'Philippines',
            zipcode:'4224'
        },
        contact:'09352213921',
        password:bcrypt.hashSync('johnjohn',10),
    }
]

module.exports = users;