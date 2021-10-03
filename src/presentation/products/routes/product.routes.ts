import { Router } from "express";
import ProductController from "../controller/ProductController";

const productRouters = Router();
const productControler = new ProductController();

productRouters.post("/", productControler.save);

productRouters.put("/", productControler.update);

productRouters.get("/", productControler.listProducts);

productRouters.get("/:id", productControler.findProductById);

productRouters.delete("/:id", productControler.delete);

export default productRouters;