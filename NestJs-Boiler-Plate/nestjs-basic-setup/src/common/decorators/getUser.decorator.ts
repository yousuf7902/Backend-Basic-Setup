// import { ExecutionContext, createParamDecorator } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { User } from 'src/modules/users/entities/user.entity';

// export const GetUser = createParamDecorator(
//     (data, context: ExecutionContext) => {
//         const req = context.switchToHttp().getRequest();
//         const authToken = req.headers['authorization'];
//         const splitToken = authToken.split(' ')[1];
//         const decodeToken = new JwtService({}).decode(splitToken);
//         return decodeToken as User;
//     },
// );
