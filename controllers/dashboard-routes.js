const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req,res) =>{
    try{
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id
            },
            attributes: ['id', 'title', 'post_text', 'created_at'],
            order: [['created_at', 'DESC']],
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'user_id', 'post_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ]
        });
        const posts = postData.map((post) => post.get({plain: true}));
        res.render('dashboard', {
            posts,
            loggedIn: req.session.loggedIn
        });

    }catch(err){
        res.status(500).json(err)
    }
});

router.get('/edit/:id', withAuth, (req,res) => {
    Post.findOne({
        where: {
            id: req.params.id,
        },
        attributes: ['id', 'title', 'content', 'created_at'],
        include: [
            {
            model: User,
            attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'user_id', 'post_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username'],
                },
            },
        ],
    })
    .then((postData)=>{
        if(!postData){
            res.status(404).json({message: 'no post with that ID'});
            return;
        }
        const post =postData.get({plain: true});
        res.render('edit-post', {post,loggedIn: true, username: req.session.username});
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
});

router.get('/new', (req, res) => {
    res.render('new-post', { username: req.session.username });
  });









module.exports = router;