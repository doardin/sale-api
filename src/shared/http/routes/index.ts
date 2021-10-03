import productRouters from "@presentation/products/routes/product.routes";
import { Router } from "express";


const routes = Router();

routes.use("/product", productRouters);

export default routes;