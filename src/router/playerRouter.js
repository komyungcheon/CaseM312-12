import fs from 'fs'
import qs from "qs";
import productController from "../controller/productController.js";


let playerRouter = {
    '/product': productController.showAll,
    '/add-product': productController.add,
    '/edit-product':productController.edit,
    '/delete-product':productController.delete,
    '/sortByPrice':productController.sortByPrice,
    '/sortByQuantity':productController.sortByQuantity,

}

export default playerRouter;
