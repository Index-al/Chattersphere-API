const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get ALL users
router.get('/', async (req, res) => {
    try {
    const users = await User.find({});
    res.json(users);
    } catch (err) {
    res.status(500).json(err);
    }
});

// Get user by ID
router.get('/:id', async (req, res) => {
    try {
    const user = await User.findById(req.params.id).populate('thoughts friends');
    res.json(user);
    } catch (err) {
    res.status(404).json(err);
    }
});

// Create a new user (POST)
router.post('/', async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
    } catch (err) {
        console.error(err); // Log the error to the console for debugging
        res.status(400).json({ message: err.message, errors: err.errors });
    }
});

// Update a user by ID (PUT)
router.put("/:id", async (req, res) => {
	try {
		const updatedUser = await User.findByIdAndUpdate(
			req.params.id,
			{ $set: req.body },
			{ new: true }
		);
		res.json(updatedUser);
	} catch (err) {
		res.status(400).json(err);
	}
});

// Delete a user by ID (DELETE)
router.delete("/:id", async (req, res) => {
	try {
		const deletedUser = await User.findByIdAndDelete(req.params.id);
		if (!deletedUser) {
			return res.status(404).json({ message: "User not found" });
		}
		res.json(deletedUser);
	} catch (err) {
		res.status(500).json(err);
	}
});

// Add a friend to a user's friend list (POST)
router.post("/:userId/friends/:friendId", async (req, res) => {
	try {
		const user = await User.findById(req.params.userId);
		const friend = await User.findById(req.params.friendId);

		if (!user || !friend) {
			return res.status(404).json({ message: "User or friend not found" });
		}

		user.friends.push(friend);
		await user.save();

		res.json(user);
	} catch (err) {
		res.status(500).json(err);
	}
});

// Remove a friend from a user's friend list (DELETE)
router.delete("/:userId/friends/:friendId", async (req, res) => {
	try {
		const user = await User.findById(req.params.userId);
		const friendId = req.params.friendId;

		const friendIndex = user.friends.findIndex((id) => id.equals(friendId));

		if (friendIndex === -1) {
			return res
				.status(404)
				.json({ message: "Friend not found in user's friend list" });
		}

		user.friends.splice(friendIndex, 1);
		await user.save();

		res.json(user);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;