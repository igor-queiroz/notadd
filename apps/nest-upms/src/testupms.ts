import { Injectable, Module, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { NestUpmsModule } from ".";
import { AuthService, JwtStrategy } from "./abstracts";
import { Token, User } from "./models/model";

@Injectable()
export class TestJwtService extends AuthService {
    constructor(private readonly jwtService: JwtService) {
        super();
    }

    async createToken(user: User): Promise<Token> {
        const token = await this.jwtService.sign(user.username);
        return { accessToken: token, expiresIn: 3600 }
    }
}

@Injectable()
export class TestStrategy extends JwtStrategy {
    async validate(payload: Token): Promise<User> {
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}

@Module({
    imports: [NestUpmsModule.forChild(TestStrategy)]
})
export class TestModule { }

