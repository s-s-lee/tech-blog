const router = require('express').Router();
const { User, Comment, Post } = require('../../models');
const withAuth = require('../../utils/auth');

// add new comment
router.post('/', withAuth, async (req, res) => {
	try {
		const newComment = await Comment.create({
			comment_text: req.body.comment_text,
			post_id: req.body.post_id,
			user_id: req.session.user_id,
		})
		res.status(200).json(newComment);
	} catch (err) {
		res.status(400).json(err);
	}
});

// to delete comment
router.delete('/delete', withAuth, async (req, res) => {
	await Comment.destroy({
		where: {
			id: req.params.id,
			user_id: req.session.user_id,
		},
	})
		.then((commentData) => {
			if (!commentData) {
				res.status(404).json({ message: 'Comment could not be deleted' });
				return;
			}
			res.json(commentData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

module.exports = router;