import { Request, Response } from "express";



export class AuthController {

    //DI
    constructor(){}

    register = (req:Request, res: Response)=>{

        res.json('registerUser')
    }
    loginUser = (req:Request, res: Response)=>{

        res.json('loginUser')
    }
    validateEmail = (req:Request, res: Response)=>{
        const token = +req.params.token;
        res.json({
            token,
            msg: 'validate email'
        })
    }
}