const router = require('express').Router();
const { User, Comment, Post } = require('../../models');
const withAuth = require('../../utils/auth');

// get all comments
router.get('/', async (req, res) => {
	try {
		const commentData = await Comment.findAll({
			// comments are tied to user, i need to tie them to a post? or is that done in post-routes
			include: [
			{
				model: User,
				attributes: ['username'],
			  }],
		});
		res.status(200).json(commentData);
	} catch (err) {
		res.status(500).json(err);
	}
});

// get specific comment
router.get('/:id', async (req, res) => {
	try {
		const commentData = await Comment.findByPk(req.params.id, {
			include: [{ 
				model: User,
				attributes: ['username'], }],
		});
		if (!commentData) {
			res.status(404).json({ message: 'No comment found with that id' });
			return;
		}
		res.status(200).json(commentData);
	} catch (err) {
		res.status(500).json(err);
	}
});

// add new comment
router.post('/', withAuth, async (req, res) => {
	try {
		const commentData = await Comment.create({
			comment_text: req.body.comment_text,
			post_id: req.body.post_id,
			user_id: req.session.user_id,
		})
		res.status(200).json(commentData);
	} catch (err) {
		res.status(400).json(err);
	}
});

// edit specific comment
router.put('/:id', withAuth, async (req, res) => {
	try {
		const commentData = await Comment.update({
			comment_text: req.body.comment_text
		},
		{where: {
			id: req.params.id
		}});
		if (!commentData) {
			res.status(404).json({ message: 'No comment found with that id' });
			return;
		}
		res.status(200).json(commentData);
	} catch (err) {
		res.status(500).json(err);
	}
})

// to delete comment
router.delete('/:id', withAuth, async (req, res) => {
	try {
		const commentData = await Comment.destroy({
			where: {
				id: req.params.id,
				user_id: req.session.user_id,
			},
		});
		if (!commentData) {
			res.status(404).json({ message: 'No comment found with that id' });
			return;
		}
		res.status(200).json(commentData);
	} catch (err) {
		res.status(500).json(err);
	}
});

// router.delete('/:id', withAuth, async (req, res) => {
// 	await Comment.destroy({
// 		where: {
// 			id: req.params.id,
// 			user_id: req.session.user_id,
// 		},
// 	})
// 		.then((commentData) => {
// 			if (!commentData) {
// 				res.status(404).json({ message: 'Comment could not be deleted' });
// 				return;
// 			}
// 			res.json(commentData);
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 			res.status(500).json(err);
// 		});
// });

module.exports = router;