const router = require('express').Router();
const { User, Thought } = require('../../models');

const { 
  addFriend, 
  removeFriend 
} = require('../../controllers/userController');

// /api/user/:userId/friends/:friendId
router
  .route('/:userId/friends/:friendId')
  .post(addFriend)
  .delete(removeFriend);


// GET all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().populate('thoughts friends');
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET a single user by its _id and populated thought and friend data
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('thoughts friends');
    if (!user) {
      res.status(404).json({ message: 'No user found with this id!' });
      return;
    }
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// POST a new user
router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// PUT to update a user by its _id
router.put('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) {
      res.status(404).json({ message: 'No user found with this id!' });
      return;
    }
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// DELETE to remove user by its _id
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).json({ message: 'No user found with this id!' });
      return;
    }
    // BONUS: Remove a user's associated thoughts when deleted
    await Thought.deleteMany({ username: user.username });
    res.json({ message: 'User and associated thoughts deleted!' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;

