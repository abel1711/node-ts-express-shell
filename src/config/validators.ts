import mongoose from "mongoose";


export class Validators {


    static isMongoID = (id: string) => mongoose.isValidObjectId(id);
}