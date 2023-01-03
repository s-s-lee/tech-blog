const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../../models');

// create a new user
router.post('/signup', async (req, res) => {
	try {
		const userData = await User.create(req.body);

		req.session.save(() => {
			req.session.user_id = userData.id;
			req.session.username = userData.username;
			req.session.logged_in = true;

			res.status(200).json(userData);
		});
	} catch (err) {
		res.status(400).json(err);
	}
});

// user login
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ 
            where: { 
                username: req.body.username
            }
        });
        if (!userData) {
            res.status(400).json({ message: 'Unable to find this user' });
            return;
        }
        // checks if pw is correct
        const validPassword = await bcrypt.compare(
            req.body.password,
            userData.password,
        );
        // if pw doesnt match
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password, please re-type your password' });
            return;
        }
        // if username and password match
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'Login success!' });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

// user logout
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;