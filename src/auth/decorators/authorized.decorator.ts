import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@prisma/__generated__';

export const Authorized = createParamDecorator(
  // Authorized("email")
  (data: keyof User, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    //   {id: 1, name: 'John', email: 'john@example.com', ...}
    const user = request.user;

    //            user['email']
    return data ? user[data] : user;
  },
);

// Authorized() -> returns the whole user object
// Authorized("email") -> returns the email of the user
