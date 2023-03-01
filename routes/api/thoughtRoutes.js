const { Thought, Reaction } = require('../../models');
const router = require('express').Router();
const { 
  getAllThoughts, 
  getThoughtById, 
  createThought, 
  updateThoughtById, 
  deleteThoughtById,
  addReaction,
  removeReaction
} = require('../../controllers/thoughtController');

// /api/thoughts
router
  .route('/')
  .get(getAllThoughts)
  .post(createThought);

// /api/thoughts/:thoughtId
router
  .route('/:thoughtId')
  .get(getThoughtById)
  .put(updateThoughtById)
  .delete(deleteThoughtById);

// /api/thoughts/:thoughtId/reactions
router
  .route('/:thoughtId/reactions')
  .post(addReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
router
  .route('/:thoughtId/reactions/:reactionId')
  .delete(removeReaction);


module.exports = router;
