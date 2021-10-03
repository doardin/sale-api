import Product from "@domain/products/entity/Product";
import { ProductRepository } from "@domain/products/repository/ProductRepository";
import AppError from "@shared/exceptions/CustomException";
import { getCustomRepository } from "typeorm";
import IPostProductDTO from "../dto/IPostProductDTO";
import IResponseProductDTO from "../dto/IResponseProductDTO";
import IUpdateProductDTO from "../dto/IUpdateProductDTO";

export default class ProductService {
    productRepository: ProductRepository  = getCustomRepository(ProductRepository);

    public async save(postProductDTO: IPostProductDTO): Promise<IResponseProductDTO> {
        const productExists = await this.productRepository.findByName(postProductDTO.name);
        
        if(productExists){
            throw new AppError("Product already exist with this name");
        }

        const product = this.productRepository.create(postProductDTO);

        await this.productRepository.save(product);

        return product as IResponseProductDTO;
    }

    public async update(updateProductDTO: IUpdateProductDTO): Promise<IResponseProductDTO> {
        const product = await this.productRepository.findOne(updateProductDTO.id);
        if (!product) {
            throw new AppError("Product not found");
        }

        const productExists = await this.productRepository.findByName(updateProductDTO.name);
        if (productExists) {
            throw new AppError("Product already exist with this name");
        }

        product.name = updateProductDTO.name;
        product.price = updateProductDTO.price;
        product.quantity = updateProductDTO.quantity;

        await this.productRepository.save(product);

        return product as IResponseProductDTO;
    }

    public async listProducts(): Promise<IResponseProductDTO[]>{
        const products = await this.productRepository.find();
        return products.map((product) => product as IResponseProductDTO);
    }

    public async findProductById(id: number): Promise<IResponseProductDTO>{
        const product = await this.productRepository.findOne(id);
        if(!product){
            throw new AppError("Product not found");
        }

        return product as IResponseProductDTO;
    }

    public async delete(id: number): Promise<void>{
        const product = await this.productRepository.findOne(id);
        if (!product) {
            throw new AppError("Product not found");
        }
        await this.productRepository.remove(product);
    }

}