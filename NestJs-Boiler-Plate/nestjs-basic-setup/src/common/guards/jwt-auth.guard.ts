import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean>{
    try {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;
        
        if (!authHeader ||  !authHeader.startsWith('Bearer ')) {
          throw new UnauthorizedException("Authentication token is missing"); 
        }
        
        const token = request.headers.authorization?.split(' ')[1];
        const payload = await this.jwtService.verifyAsync(token, {
          secret: process.env.JWT_SECRET,
        });

        if (!payload) {
          throw new UnauthorizedException('Invalid token or expired token');
        }

        request.user = payload; // attach decoded token to request
        return true; 
    } catch (error) {
      throw new UnauthorizedException('Invalid token or expired token');
    }
  }
}
