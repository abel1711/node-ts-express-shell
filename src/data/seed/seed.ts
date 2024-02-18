import { envs } from "../../config";
import { CategoryModel } from "../mongo/models/category.models";
import { ProductModel } from "../mongo/models/product.models";
import { UserModel } from "../mongo/models/user.models";
import { MongoDatabase } from "../mongo/mongo-database";
import { seedData } from "./data";


(async () => {
    console.clear();
    await MongoDatabase.connect({
        dbName: envs.MONGO_DBNAME,
        mongoUrl: envs.MONGO_URL
    });
    await main();


    await MongoDatabase.disconnect();
})();

const randomBetween0AndX = (x: number) => Math.floor(Math.random() * x);

async function main() {

    // delete all data
    await Promise.all([
        UserModel.deleteMany(),
        CategoryModel.deleteMany(),
        ProductModel.deleteMany(),
    ]);
    // create users
    const users = await UserModel.insertMany(seedData.users);
    // create categories

    const categories = await CategoryModel.insertMany(
        seedData.categories.map(category => ({
            ...category,
            user: users[randomBetween0AndX(users.length - 1)]._id,
        }))
    )
    //create products
    const products = await ProductModel.insertMany(
        seedData.products.map(product => ({
            ...product,
            user: users[randomBetween0AndX(users.length - 1)]._id,
            category: categories[randomBetween0AndX(categories.length - 1)]._id,
        }))
    )

    console.log('SEEDED!')
}