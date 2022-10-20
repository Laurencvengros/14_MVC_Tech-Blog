const router = require('express').Router();
const { Comment, User, Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req,res) =>{
    try{
        const commentData = await Comment.findAll({});
        console.log(commentData);
        res.status(200).json(commentData);
    }catch(err){
        res.status(500).json(err);
    }
});

router.get('/:id', async (req,res) =>{
    try{
        const commentData = await Comment.findByPk(req.params.id);
        console.log(commentData);
        res.status(200).json(commentData);
    }catch(err){
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
      const commentData = await Comment.create({
            comment_text: req.body.comment_text,
            post_id: req.body.post_id,
            user_id: req.session.user_id
      });
  
      req.session.save(() => {
        req.session.loggedIn = true;
  
        res.status(200).json(commentData);
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

router.put('/:id', withAuth, async (req,res) =>{
    try{
        const updateComment = await Comment.update(
            {
                comment_text: req.body.comment_text,
            },
            {
                where: {
                  id: req.params.id,
                },
            }
        );
        if(!updateComment){
            res.status(404).json({message: 'No comment with that id!'});
            return;
        }
        res.status(200).json(updateComment);
    }catch(err){
        res.status(500).json(err);
    }
});

router.delete('/:id', withAuth, async (req,res) =>{
    try{
        const deleteComment = await Comment.destroy({
            where:{
                id: req.params.id,
            },
        });
        if(!deleteComment){
            res.status(404).json({message: 'No comment with that ID!'});
            return;
        }
        res.status(200).json(deleteComment);
    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;
