import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { UsersService } from 'src/users/users.service';
import { promisify } from 'util';
import { SignUpDto } from './dtos/sign-up.dto';
import { SignInDto } from './dtos/sign-in.dto';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const { email, password, confirmPassword } = signUpDto;
    if (password !== confirmPassword) {
      throw new BadRequestException('Passwords does not match');
    }
    // see if the email is in use
    const users = await this.usersService.findOneByEmail(email);
    if (users) {
      throw new BadRequestException('Email in use');
    }
    // hash the users password
    // generate the  salt (16 characters)
    const salt = randomBytes(8).toString('hex');
    // hash the salt and the password together
    const hash = ((await scrypt(password, salt, 32)) as Buffer).toString('hex');
    // join the hashed result and salt together
    const result = `${salt}.${hash}`;
    // create a new user and save it
    const user = await this.usersService.create(email, result);

    const payload = { ...user };
    const accessToken = await this.jwtService.signAsync(payload);
    return {
      user,
      accessToken,
    };
  }

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException();
    }
    const [storedSalt, storedHash] = user.password.split('.');
    const hash = ((await scrypt(password, storedSalt, 32)) as Buffer).toString(
      'hex',
    );
    if (storedHash !== hash) {
      throw new UnauthorizedException();
    }

    const payload = { ...user };
    const accessToken = await this.jwtService.signAsync(payload);
    return {
      user,
      accessToken,
    };
  }
}
