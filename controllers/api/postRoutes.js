const router = require('express').Router();
const { Comment, User, Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req,res) =>{
    try{
        const postData = await Post.findAll({
            attributes: [ 'id', 'title', 'content', 'created_at'],
            order: [['created_at', 'DESC']],
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'user_id', 'post_id', 'created_at'],
                    include: {model: User, attributes: ['username']},
                },
            ],
        });
        res.status(200).json(postData.reverse());
    }catch(err){
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) =>{
    try{
        const postData = await Post.findOne({
            where: { id: req.params.id},
            attributes: ['id', 'title', 'content', 'created_at'],
            order: [['created_at', 'DESC']],
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
                {
                    model:Comment,
                    attributes: ['id', 'comment_text', 'user_id', 'post_id', 'created_at'],
                    include: { model: User, attributes: ['username']},
                },
            ],
        });
        if(!postData){
            res.status(404).json({message: 'no posts with that id'});
            return;
        }
        res.status(200).json(postData);
    }catch(err){
        res.status(500).json(err);
    }
});

router.post('/:id', withAuth, async (req, res) =>{
    try{
        const newPost = await Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id
        });
        req.session.save(() => {
        req.session.loggedIn = true;
      
        res.status(200).json(commentData);
        });
    }catch(err){
        res.status(500).json(err)
    }
});

router.put('/:id', withAuth, async (req,res) =>{
    try{
        const updatePost = await Post.update(
            {
                comment_text: req.body.comment_text,
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        );
        if(!updatePost){
            res.status(404).json({message: 'no post witht aht ID'});
            return;
        }
        res.status(200).json(updatePost);
    }catch(err){
        res.status(500).json(err);
    }
});

router.delete('/:id', withAuth, async (req,res) =>{
    try{
        const deletePost = await Post.destroy({
            where:{
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        if(!deletePost){
            res.status(404).json({message: 'no post with this id'});
            return;
        }
        res.status(200).json(deletePost);
    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;