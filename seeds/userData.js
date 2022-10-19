const { User } = require('../models');

const userData = [
    {
        username: 'Amanda',
        email: "testemail1@email.com",
        password: "testpassword1",
    },
    {
        username: 'Joe',
        email: "testemail2@email.com",
        password: "testpassword2",
    },
    {
        username: 'Ryan',
        email: "testemail3@email.com",
        password: "testpassword3",
    },
    {
        username: 'Sam',
        email: "testemail4@email.com",
        password: "testpassword4",
    },
    {
        username: 'Carly',
        email: "testemail5@email.com",
        password: "testpassword5",
    },
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;