// backend/src/auth/auth.service.ts
import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/entities/user.entity';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<{ token: string; user: Partial<User> }> {
    const { username, email, password, role, fullName, businessName } = registerDto;

    // Check if user exists
    const existingUser = await this.usersRepository.findOne({ 
      where: [{ username }, { email }] 
    });
    if (existingUser) {
      throw new ConflictException('Username or email already exists');
    }

    // Hash password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = this.usersRepository.create({
      username,
      email,
      password_hash: hashedPassword,
      role,
      full_name: fullName,
      business_name: businessName,
    });

    await this.usersRepository.save(user);

    // Generate token
    const token = this.generateToken(user);

    // Remove password from response
    const { password_hash, ...result } = user;

    return { token, user: result };
  }

  async login(loginDto: LoginDto): Promise<{ token: string; user: Partial<User> }> {
    const { email, password } = loginDto;

    // Find user
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate token
    const token = this.generateToken(user);

    // Remove password from response
    const { password_hash, ...result } = user;

    return { token, user: result };
  }

  private generateToken(user: User): string {
    const payload: JwtPayload = { 
      sub: user.id, 
      username: user.username,
      email: user.email,
      role: user.role 
    };
    return this.jwtService.sign(payload);
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }
}