import {createUser, getUserByUserId, getUsers, updateUser, deleteUser } from '../Controllers/user.controller';

const router = require("express").Router();

router.post("/", createUser);
router.get("/",getUsers);
router.get("/:id",getUserByUserId);
router.get("/",updateUser);
router.get("/",deleteUser);

module.exports = router;