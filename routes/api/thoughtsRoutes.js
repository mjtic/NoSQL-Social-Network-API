const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  // deleteReaction

} = require('../../controllers/thoughtControllers');

// /api/thoughts
router.route('/').get(getAllThoughts)

// /api/thoughts/:id
router.route('/:id').get(getThoughtById).put(updateThought)
.delete(deleteThought);

// /api/thoughts/:id
router.route('/:id').post(createThought)


// /api/thoughts/:thoughtId/reactions
router.route('/:id/reactions/').post(addReaction);

// /api/thoughts/:thoughtId/reaction/:reactionId
// router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);




module.exports = router;