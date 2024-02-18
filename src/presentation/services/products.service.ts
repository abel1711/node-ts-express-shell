import { ProductModel } from "../../data";
import { CreateProductDto, CustomError, PaginationDto } from "../../domain";



export class ProductsService {

    constructor() {

    }

    async createProduct(createProductDto: CreateProductDto) {
        const productExist = await ProductModel.findOne({ name: createProductDto.name });
        if (productExist) throw CustomError.badRequest('Product already exist.');


        try {
            const product = new ProductModel(createProductDto);
            await product.save();
            return product;

        } catch (error) {
            console.log(error);
            throw CustomError.internalServer('Internal server error.')
        }

    }

    async getProducts(paginationDto: PaginationDto) {
        const { limit, page } = paginationDto;
        try {
            const [total, products] = await Promise.all([
                ProductModel.countDocuments(),
                ProductModel.find()
                    .skip((page - 1) * limit)
                    .limit(limit)
                    .populate('user')
                    .populate('category')
            ]);

            return {
                page,
                limit,
                total,
                next: `/api/products?page=${(page + 1)}&limit=${limit}`,
                prev: (page > 1) ? `/api/products?page=${(page - 1)}&limit=${limit}` : null,
                products
            };
        } catch (error) {
            console.log(error);
            throw CustomError.internalServer('Internal server error.')
        }

    }
}