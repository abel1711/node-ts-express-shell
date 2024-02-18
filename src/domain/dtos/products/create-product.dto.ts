import { Validators } from "../../../config";


export class CreateProductDto {

    private constructor(
        public readonly name: string,
        public readonly price: number,
        public readonly description: string,
        public readonly available: boolean,
        public readonly user: string,
        public readonly category: string,
    ) { }

    static create(obj: { [key: string]: any }): [string?, CreateProductDto?] {
        const { name,
            price,
            description,
            available,
            user,
            category } = obj;

        if (!name) return ['Missing name'];
        if (!user) return ['Missing user'];
        if (!Validators.isMongoID(user)) return ['user is not a valid mongo id.'];
        if (!category) return ['Missing category'];
        if (!Validators.isMongoID(category)) return ['category is not a valid mongo id.'];

        return [undefined, new CreateProductDto(name, price, description, !!available, user, category)]
    }
}