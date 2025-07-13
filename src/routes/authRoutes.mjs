import { Router } from "express";
import { checkAuth, logout, signIn, signUp } from "../controllers/auth.controllers.mjs";
import { verifyToken } from "../middleware/verfifyToken.mjs";

const userRouter = Router();

userRouter.post("/auth/sign-up", signUp);

userRouter.post("/auth/sign-in", signIn);

userRouter.get("/auth/check-auth", verifyToken, checkAuth);

userRouter.post("/auth/logout", logout);

export default userRouter;
