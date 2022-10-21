const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

router.get('/', async (req,res) =>{
    try{
        const userData = await User.findAll({
            attributes: {exclude: ['password']},
        });
        res.status(200).json(userData);
    }catch(err){
        res.status(500).json(err);
    }
});

router.get('/:id', async (req,res)=>{
    try{
        const userData = await User.findOne({
            attributes: {exclude:['password']},
            where: {id: req.params.id},
            include: [
                {
                    model: Post,
                    attributes: ['id', 'title', 'content', 'created_at'],
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'created_at'],
                    include:{ Post,
                    attributes: ['title']
                    },
                },
                {
                    model: Post,
                    attributes: ['title'],
                },
            ],
        });
        if(!userData){
            res.status(404).json({message: 'user id does not exist'});
            return;
        }
        res.sendStatus(200).json(userData);
    }catch(err){
        res.status(500).json(err);
        
    }
});

router.post('/', async (req,res) =>{
    try{
        const newUser = await User.create({
            username: req.body.username,
            password: req.body.password
        });
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.logged_in = true;

            res.status(200).json(newUser);
        });
    }catch(err){
        res.status(500).json(err)
    }
});

router.post('/login', async (req,res) =>{
    try{
        const userData = await User.findOne({
            where: {useranme: req.body.username},
        });
        if(!userData){
            res.status(404).json({message: 'invalid username'});
            return;
        }
        const validatePass = await userData.checkPassword(req.body.password);
        if(!validatePass){
            res.status(404).json({message: 'invalid password'});
            return;
        }
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.logged_in = true;
      
            res.json({ user: userData, message: 'log in success!' });
        });
    }catch(err){
        res.status(500).json(err);
    }
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });
