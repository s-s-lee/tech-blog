const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require("../utils/auth");

// route to get all blog posts
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      // order: [
      //   ['username', 'DESC'],
      // ],
      include: {
        model: User,
        attributes: ['username'],
      },
    });
    // serialize data
    const posts = postData.map((post) => post.get({ plain: true }));
    // pass data and session flag to template
    res.render('homepage', {
      posts, 
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get a blog post by its id
router.get('/posts/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          attributes: ['comment_text', 'created_on'],
          include: [
            {
              model: User,
              attributes: ['username'],
            },
          ],
        },
      ],
    });
    const post = postData.get({ plain: true });
    const blogPoster = post.user_id == req.session.user_id;
    res.render('detailedPost', {
      ...post,
      blog_poster: blogPoster,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// load comment by id
router.get('/comments/:id', async (req, res) => {
  try {
    const commentData = await Comment.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });
    const comment = commentData.get({ plain: true });
    const blogPoster = comment.user_id == req.session.user_id;
    res.render('comment', {
      ...comment,
      blog_poster: blogPoster,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all posts for dashboard
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id
      },
      include: [
        {
          model: User,
          attributes: ['username']
        },
      ],
    });
    const posts = postData.map((post) => post.get({ plain: true}));
    res.render('dashboard', {
      posts, 
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// user login 
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login');
});

// signup
router.get('/signup', (req, res) => {
  res.render('signup');
});

module.exports = router;