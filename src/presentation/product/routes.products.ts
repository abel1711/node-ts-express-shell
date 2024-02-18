import { Router } from "express";
import { ProductController } from './controller.products';
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { ProductsService } from "../services/products.service";




export class ProductRoutes {


    static get routes(): Router {

        const router = Router();
        const productService = new ProductsService();
        const controller = new ProductController(productService);

        router.post('/', [AuthMiddleware.validateJWT], controller.createProduct);
        router.get('/', controller.getProducts);


        return router;
    }
}