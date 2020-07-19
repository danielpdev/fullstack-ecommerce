import * as express from 'express';

import * as UserController from "../controllers/user";

const router = express.Router();

router.post("/signup", UserController.createUser);
router.post("/login", UserController.userLogin);
router.post("/forgot", UserController.forgotPassword);
router.post("/reset", UserController.resetPassword);

export default router;
