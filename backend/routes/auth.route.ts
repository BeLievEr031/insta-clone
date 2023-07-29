import { Router } from "express";
import { AuthController } from "../controllers";
import AsyncHandler from "../utils/AsyncHandler";

const route = Router();

route.post("/", AsyncHandler(AuthController.register))
   
export default route;