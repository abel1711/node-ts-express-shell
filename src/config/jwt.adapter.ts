import jwt from 'jsonwebtoken';
import { envs } from './envs';

export class JwtAdapter {


    static async generateToken(payload: any, duration: string = '2h') {
        return new Promise((resolve) => {
            jwt.sign(payload, envs.SECRETORPRIVATEKEY, { expiresIn: duration }, (error, token) => {
                if (error) return resolve(null);
                return resolve(token);
            });
        })
    };

    static validateToken(token: string) {

    };
}