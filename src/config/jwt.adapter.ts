import jwt from 'jsonwebtoken';
import { envs } from './envs';

const JWT_SEED = envs.SECRETORPRIVATEKEY;

export class JwtAdapter {


    static async generateToken(payload: any, duration: string = '2h') {
        return new Promise((resolve) => {
            jwt.sign(payload, JWT_SEED, { expiresIn: duration }, (error, token) => {
                if (error) return resolve(null);
                return resolve(token);
            });
        })
    };

    static validateToken(token: string) {
        return new Promise((resolve) => {
            jwt.verify(token, JWT_SEED, (err, decode) => {
                if (err) return null;
                resolve(decode);
            })
        })
    };
}