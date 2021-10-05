import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import ProductController from "../controller/ProductController";

const productRouters = Router();
const productControler = new ProductController();

productRouters.post("/", celebrate({
    [Segments.BODY]: {
        name: Joi.string().required(),
        price: Joi.number().precision(2).required(),
        quantity: Joi.number().required() 
    }
}), productControler.save);

productRouters.put("/", celebrate({
    [Segments.BODY]: {
        id: Joi.string().uuid().required(),
        name: Joi.string().required(),
        price: Joi.number().precision(2).required(),
        quantity: Joi.number().required()
    }
}), productControler.update);

productRouters.get("/", productControler.listProducts);

productRouters.get("/:id", celebrate({
    [Segments.PARAMS]: {
        id: Joi.string().uuid().required()
    }
}) , productControler.findProductById);

productRouters.delete("/:id", celebrate({
    [Segments.PARAMS]: {
        id: Joi.string().uuid().required()
    }
}), productControler.delete);

export default productRouters;