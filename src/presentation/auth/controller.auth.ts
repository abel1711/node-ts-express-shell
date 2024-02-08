import { Request, Response } from "express";
import { CustomError, RegisterUserDto } from "../../domain";
import { AuthService } from "../services/auth.service";



export class AuthController {

    //DI
    constructor(
        public readonly authService: AuthService,
    ) { }

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) return res.status(error.statusCode).json({ error: error.message });
        console.log(`${error}`);
        return res.status(500).json({ error: 'Internal server error' });
    };

    register = async (req: Request, res: Response) => {
        const [error, registerUserDto] = RegisterUserDto.create(req.body);
        if (error) res.status(400).json({ error });

        return this.authService.registerUser(registerUserDto!)
            .then(newUser => res.json(newUser))
            .catch(error => this.handleError(error, res));

    }
    loginUser = (req: Request, res: Response) => {

        res.json('loginUser')
    }
    validateEmail = (req: Request, res: Response) => {
        const token = +req.params.token;
        res.json({
            token,
            msg: 'validate email'
        })
    }
}