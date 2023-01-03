const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// get all blog posts
router.get('/', (req, res) => {
  Post.findAll({
    attributes: ['id', 'title', 'post_content', 'created_on'],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_on'],
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
    .then((postData) => res.json(postData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// to get specific post
router.get('/:id', (req, res) => {
  Post.findOne({
    where: { 
      id: req.params.id,
    },
    attributes: [ 'id', 'title', 'post_content', 'created_on'],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_on'],
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
    .then((postData) => {
      if (!postData) {
        res.status(404).json({ message: 'No post found with this id!' });
        return;
      }
      res.json(postData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// create new blog post
router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      title: req.body.title,
      post_content: req.body.content,
      user_id: req.session.user_id,
    });
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// route to edit a specific blog post
router.put('/:id', withAuth, (req, res) => {
  Post.update(
    {
      title: req.body.title,
      post_content: req.body.content,
    },
    {
      where: { 
        id: req.params.id,
      },
    }
  )
    .then((postData) => {
      if (!postData) {
        res.status(404).json({ message: 'No post found with this id!' });
        return;
      }
      res.json(postData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// delete post by id
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;