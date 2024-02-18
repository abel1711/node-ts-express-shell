import { Router } from 'express';
import { AuthRoutes } from './auth/routes.auth';
import { CategoryRoutes } from './category/routes.category';
import { ProductRoutes } from './product/routes.products';




export class AppRoutes {


  static get routes(): Router {

    const router = Router();

    // Definir las rutas
    router.use('/api/auth', AuthRoutes.routes);
    router.use('/api/category', CategoryRoutes.routes);
    router.use('/api/products', ProductRoutes.routes);


    return router;
  }


}

