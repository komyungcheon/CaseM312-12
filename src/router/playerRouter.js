import fs from 'fs'
import qs from "qs";
import playerController from "../controller/playerController.js";


let playerRouter = {
    '/players': playerController.showAll,
    '/add-player': playerController.add,
    '/edit-player':playerController.edit,
    '/delete-player':playerController.delete,

}

export default playerRouter;
