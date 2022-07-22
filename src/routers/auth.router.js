const express = require('express');
const authController = require('../controllers/auth.controller')
const authRouter = express.Router();
require('express-async-errors');

authRouter.post('/', authController.authUser);

module.exports = authRouter;