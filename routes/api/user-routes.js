const router = require('express').Router();

const {getAllUser, getUserById, createUser, updateUser, deleteUser} = require('../../controllers/user-controller');
 
router
.route('/')
.get(getAllUser)
.post(createUser);

router
.route('/:id')
.get(getUserB
    yId)
.put(updateUser)
.delete(deleteUser);

router
.route('')

module.exports = router;