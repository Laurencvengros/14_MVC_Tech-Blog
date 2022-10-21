const {Post} = require('../models');

const postData = [
    {
        title: 'How to use Express.js',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        user_id: 1,
    },
    {
        title: 'Insomnia: The Basics for testing your APIs',
        content: 'Lorem ipsum dolor sit amet, consectetur adipis',
        user_id: 2,
    },
    {
        title: 'All About Cookies',
        content: 'Lorem ipsum dolor sit amet, consectetur adipi laborum.',
        user_id: 3,
    },
    {
        title: 'Tips for using SQL',
        content: 'Lorem ipsum dolam,anim id est laborum.',
        user_id: 4,
    },
    {
        title: 'Your guide to the MVC paradigm',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing it anim id est laborum.',
        user_id: 5,
    },
];

const seedPost = () => Post.bulkCreate(postData);

module.exports = seedPost