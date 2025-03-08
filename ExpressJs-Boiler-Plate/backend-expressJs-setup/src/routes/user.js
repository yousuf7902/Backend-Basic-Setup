import express from "express";
import { activation, getLogin, getSignUp } from "../controllers/user";

const router = express.Router();

router.post("/login", getLogin);
router.post("/sign-up", getSignUp);
router.post("/activation", activation );
router.post("/logout",);


export default router;