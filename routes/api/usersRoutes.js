const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend

} = require('../../controllers/userController');

// /api/users
router.route('/').get(getAllUsers).post(createUser);

// /api/users/:id
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);

// /api/users/:id/friends/
router.route('/:id/friends/').post(addFriend);

// /api/students/:id/friends/:friendId
router.route('/:id/friends/:friendId').delete(deleteFriend);

module.exports = router;
