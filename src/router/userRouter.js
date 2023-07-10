import fs from 'fs'
import userController from "../controller/userController.js";

let userRouter = {
    '/users': userController.showAll,
    '/add-user': userController.showFormAdd,
}

export default userRouter;
