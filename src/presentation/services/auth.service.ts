import { JwtAdapter, bcryptAdapter } from "../../config";
import { UserModel } from "../../data";
import { CustomError, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";
import { EmailService } from "./email.service";


export class AuthService {
    constructor(
        private readonly emailService: EmailService,
        private readonly webservice_url: string,
    ) { }


    public async registerUser(registerUserDto: RegisterUserDto) {

        const existUser = await UserModel.findOne({ email: registerUserDto.email });

        if (existUser) throw CustomError.badRequest('Email already exist');

        try {
            const user = new UserModel(registerUserDto);

            user.password = bcryptAdapter.hash(registerUserDto.password);

            await user.save();

            this.sendEmailValidationLink(user.email);

            const { password, ...userEntity } = UserEntity.fromObject(user);
            const token = await JwtAdapter.generateToken({ id: user._id });
            if (!token) throw CustomError.internalServer('Error while generate JWT');
            return {
                user: userEntity,
                token
            };
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }

    public async loginUser(loginUserDto: LoginUserDto) {

        const user = await UserModel.findOne({ email: loginUserDto.email });
        if (!user) throw CustomError.badRequest('Email or password wrong.');

        try {
            const isValid = bcryptAdapter.compare(loginUserDto.password, user.password);
            if (!isValid) throw CustomError.badRequest('Email or password wrong.');

            const { password, ...userEntity } = UserEntity.fromObject(user);
            const token = await JwtAdapter.generateToken({ id: user._id });
            if (!token) throw CustomError.internalServer('Error while generate JWT');
            return {
                user: userEntity,
                token
            };
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    };

    public validateEmail = async (token: string) => {
        const payload = await JwtAdapter.validateToken(token);
        if (!payload) throw CustomError.unauthorized('Invalid token');

        const { email } = payload as { email: string };
        if (!email) throw CustomError.internalServer('Email not in token');

        const user = await UserModel.findOne({ email });
        if (!user) throw CustomError.internalServer('Email not exist');

        user.emailValidated = true;
        await user.save();
        return true;

    }

    private sendEmailValidationLink = async (email: string) => {

        const token = await JwtAdapter.generateToken({ email });
        if (!token) throw CustomError.internalServer('Error while generate JWT');

        const link = `${this.webservice_url}/auth/validate-email/${token}`;

        const html = `
        <h1>Validate your email</h1>
        <p>Click on the following link to validate your email</p>
        <a href="${link}"> Validate your email </a>
        `;

        const options = {
            to: email,
            subject: 'Validate email',
            htmlBody: html,
        };

        const isSend = await this.emailService.sendEmail(options);
        if (!isSend) throw CustomError.internalServer('Error sending email');

        return true;

    }
}