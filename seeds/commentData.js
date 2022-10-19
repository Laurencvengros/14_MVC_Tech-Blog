const { Comment } = require('../models');

const commentData = [
    {
        comment_text: 'Cool Post!',
        user_id: 1,
        post_id: 5,
    },
    {
        comment_text: 'Love This!',
        user_id: 2,
        post_id: 4,
    },
    {
        comment_text: 'Great insight!',
        user_id: 3,
        post_id: 2,
    },
    {
        comment_text: 'hmmm...interesting',
        user_id: 4,
        post_id: 5,
    },
    {
        comment_text: 'Very informative!',
        user_id: 5,
        post_id: 3,
    },
];

const seedComment = () =>Comment.bulkCreate(commentData);
module.exports = seedComment;