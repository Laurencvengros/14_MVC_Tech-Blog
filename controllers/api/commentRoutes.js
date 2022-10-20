const router = require('express').Router();
const { Comment, User, Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req,res) =>{
    try{
        const commentData = await Comment.findAll({});
        if(commentData.length === 0){
            res.status(404).json({message: 'no comments yet!'});
            return;
        }
        res.status(200).json(commentData);
    }catch(err){
        res.status(500).json(err);
    }
});

router.get()
