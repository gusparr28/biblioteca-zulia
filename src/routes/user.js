const { Router } = require('express');
const router = Router();

const { getUser, getUsers, createUser, updateUser, deleteUser, searchUser } = require('../controllers/user.controller');

router.route('/user')
    .get(getUsers)
    .post(createUser);

router.route('/user/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);

router.post('/searchUser', searchUser);

module.exports = router;