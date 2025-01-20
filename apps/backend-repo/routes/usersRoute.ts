import express from "express";
import UsersController from "../controller/usersController";
import { RoutesProps } from "../types";

export default function userRoutes({
  controller,
  middleware,
}: RoutesProps<UsersController>) {
  const routes = express.Router();

  routes.post("/", controller.postRegisterUser);
  routes.get("/:id", middleware.auth, controller.getUserById);
  routes.put("/:id", middleware.auth, controller.putUpdateUserById);

  return routes;
}
