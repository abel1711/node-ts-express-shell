import { bcryptAdapter } from "../../config";
import { UserModel } from "../../data";
import { CustomError, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";


export class AuthService {
    constructor() { }


    public async registerUser(registerUserDto: RegisterUserDto) {

        const existUser = await UserModel.findOne({ email: registerUserDto.email });

        if (existUser) throw CustomError.badRequest('Email already exist');

        try {
            const user = new UserModel(registerUserDto);

            user.password = bcryptAdapter.hash(registerUserDto.password);

            await user.save();

            const { password, ...userEntity } = UserEntity.fromObject(user);
            return {
                user: userEntity,
                token: 'ABC'
            };
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }

    public async loginUser( loginUserDto: LoginUserDto) {

        const user = await UserModel.findOne({email: loginUserDto.email});
        if (!user) throw CustomError.badRequest('Email or password wrong.');

        try {
            const isValid = bcryptAdapter.compare(loginUserDto.password, user.password);
            if (!isValid) throw CustomError.badRequest('Email or password wrong.');

            const { password, ...userEntity } = UserEntity.fromObject(user);
            return {
                user: userEntity,
                token: 'ABC'
            };
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }
}