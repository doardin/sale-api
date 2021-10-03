import { ProductRepository } from "@domain/products/repository/ProductRepository";
import AppError from "@shared/exceptions/CustomException";
import { getCustomRepository } from "typeorm";
import IPostProductDTO from "../dto/IPostProductDTO";
import IResponseProductDTO from "../dto/IResponseProductDTO";
import IUpdateProductDTO from "../dto/IUpdateProductDTO";

export default class ProductService {

    public async save(postProductDTO: IPostProductDTO): Promise<IResponseProductDTO> {
        const productRepository = getCustomRepository(ProductRepository);
        const productExists = await productRepository.findByName(postProductDTO.name);
        
        if(productExists){
            throw new AppError("Product already exist with this name");
        }

        const product = productRepository.create(postProductDTO);

        await productRepository.save(product);

        return product as IResponseProductDTO;
    }

    public async update(updateProductDTO: IUpdateProductDTO): Promise<IResponseProductDTO> {
        const productRepository = getCustomRepository(ProductRepository);
        const product = await productRepository.findOne(updateProductDTO.id);
        if (!product) {
            throw new AppError("Product not found");
        }

        const productExists = await productRepository.findByName(updateProductDTO.name);
        if (productExists) {
            throw new AppError("Product already exist with this name");
        }

        product.name = updateProductDTO.name;
        product.price = updateProductDTO.price;
        product.quantity = updateProductDTO.quantity;

        await productRepository.save(product);

        return product as IResponseProductDTO;
    }

    public async listProducts(): Promise<IResponseProductDTO[]> {
        const productRepository = getCustomRepository(ProductRepository);
        const products = await productRepository.find();
        return products.map((product) => product as IResponseProductDTO);
    }

    public async findProductById(id: string): Promise<IResponseProductDTO>{
        const productRepository = getCustomRepository(ProductRepository);
        const product = await productRepository.findOne(id);
        if(!product){
            throw new AppError("Product not found");
        }

        return product as IResponseProductDTO;
    }

    public async delete(id: string): Promise<void>{
        const productRepository = getCustomRepository(ProductRepository);
        const product = await productRepository.findOne(id);
        console.log(product);
        if (!product) {
            throw new AppError("Product not found");
        }
        await productRepository.remove(product);
    }

}