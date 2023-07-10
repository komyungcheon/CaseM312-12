import fs from 'fs'
import playerRouter from "./playerRouter.js";
import userRouter from "./userRouter.js";
import homeController from "../controller/homeController.js";

let router = {
    '/': homeController.showHome,
    '/login': homeController.login,
    '/logout': homeController.logout,
    '/err': homeController.showErr,
}
router = {...router, ...playerRouter};
router = {...router, ...userRouter};
export default router;
