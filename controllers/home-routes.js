const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const router = require('express').Router();

router.get('/', async (req, res) => {
    try{
        const postData = await Post.findAll({
            include:[{
                model: User,
                attributes: ['username'],
            }],
        });
        const posts = postData.map((post) => post.get({ plain: true}));
        res.render('homepage', {
            posts, 
            loggedIn: req.session.loggedIn});
    }catch(err){
        res.status(500).json(err)
    }
   
});

router.get('/post/:id', (req,res) =>{
    Post.findOne({
        where:{
            id: req.params.id,
        },
        attributes:['id', 'title', 'content', 'created_at'],
        inculde: [
            {
                model: Comment,
                attributes:['id', 'comment_text', 'user_id', 'post_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username'],
                },
            },
            {
                model: User,
                attributes: ['username'],
            },
        ],
    })
    .then((postData) =>{
        if(!postData){
            res.status(404).json({message: 'no post with this ID'});
            return;
        }
        const post = postData.get({ plain: true});
        res.render('single-post', {post, loggedIn: req.session.loggedIn})
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/login', (req,res) =>{
    if(req.session.loggedIn){
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/signup', (req,res)=>{
    res.render('signup');
});

module.exports = router;