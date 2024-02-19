import { Router } from 'express';
import { AuthRoutes } from './auth/routes.auth';
import { CategoryRoutes } from './category/routes.category';
import { ProductRoutes } from './product/routes.products';
import { FileUploadRoutes } from './file-upload/routes.file-upload';
import { ImagesRoutes } from './images/routes.images';




export class AppRoutes {


  static get routes(): Router {

    const router = Router();

    // Definir las rutas
    router.use('/api/auth', AuthRoutes.routes);
    router.use('/api/category', CategoryRoutes.routes);
    router.use('/api/products', ProductRoutes.routes);
    router.use('/api/upload', FileUploadRoutes.routes);
    router.use('/api/images', ImagesRoutes.routes);

    return router;
  }


}

