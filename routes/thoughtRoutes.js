const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Thought = require('../models/Thought');

// Create a new thought (POST)
router.post('/', async (req, res) => {
    try {
        const newThought = await Thought.create(req.body);
        await User.findByIdAndUpdate(
            req.body.userId,
            { $push: { thoughts: newThought._id } },
            { new: true }
        );
        res.json(newThought);
    } catch (err) {
    res.status(400).json(err);
    }
});

// Get all thoughts (GET)
router.get("/", async (req, res) => {
	try {
		const thoughts = await Thought.find();
		res.json(thoughts);
	} catch (err) {
		res.status(500).json(err);
	}
});

// Get a thought by ID (GET)
router.get('/:thoughtId', async (req, res) => {
  try {
    const thought = await Thought.findOne({ _id: req.params.thoughtId });
    if (!thought) {
      return res.status(404).json({ message: 'No thought with this id!' });
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a thought by ID (PUT)
router.put("/:thoughtId", async (req, res) => {
	try {
		const updatedThought = await Thought.findOneAndUpdate(
			{ _id: req.params.thoughtId },
			{ $set: req.body },
			{ new: true }
		);
		if (!updatedThought) {
			return res.status(404).json({ message: "No thought with this id!" });
		}
		res.json(updatedThought);
	} catch (err) {
		res.status(500).json(err);
	}
});

// Delete a thought by ID (DELETE)
// Delete a thought by ID (DELETE)
router.delete("/:thoughtId", async (req, res) => {
	try {
		const deletedThought = await Thought.findOneAndDelete({
			_id: req.params.thoughtId,
		});
		if (!deletedThought) {
			return res.status(404).json({ message: "No thought with this id!" });
		}
		res.json(deletedThought);
	} catch (err) {
		res.status(500).json(err);
	}
});

// Add a reaction to a thought (POST)
router.post("/:thoughtId/reactions", async (req, res) => {
	try {
		const thought = await Thought.findOneAndUpdate(
			{ _id: req.params.thoughtId },
			{ $addToSet: { reactions: req.body } },
			{ new: true }
		);
		if (!thought) {
			return res
				.status(404)
				.json({ message: "No thought found with this id!" });
		}
		res.json(thought);
	} catch (err) {
		res.status(500).json(err);
	}
});

// Delete a reaction from a thought (DELETE)
router.delete("/:thoughtId/reactions/:reactionId", async (req, res) => {
	try {
		const thought = await Thought.findOneAndUpdate(
			{ _id: req.params.thoughtId },
			{ $pull: { reactions: { reactionId: req.params.reactionId } } },
			{ new: true }
		);
		if (!thought) {
			return res
				.status(404)
				.json({ message: "No thought found with this id!" });
		}
		res.json(thought);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;