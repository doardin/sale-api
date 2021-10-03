import IPostProductDTO from "@application/products/dto/IPostProductDTO";
import IUpdateProductDTO from "@application/products/dto/IUpdateProductDTO";
import ProductService from "@application/products/service/ProductService";
import { throws } from "assert";
import { Request, Response } from "express";

export default class ProductController {
    public async save(request: Request, response: Response): Promise<Response> {
        const postProductDTO = request.body as IPostProductDTO;

        const productService = new ProductService();
        return response.json(await productService.save(postProductDTO));
    }

    public async update(request: Request, response: Response): Promise<Response> {
        const updateProductDTO = request.body as IUpdateProductDTO;

        const productService = new ProductService();
        return response.json(await productService.update(updateProductDTO));
    }

    public async listProducts(request: Request, response: Response): Promise<Response> {
        const productService = new ProductService();
        return response.json(await productService.listProducts());
    }

    public async findProductById(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const productService = new ProductService();
        return response.json(await productService.findProductById(id));
    }

    public async delete(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const productService = new ProductService();
        return response.json(await productService.delete(id));
    }

}