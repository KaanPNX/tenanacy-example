import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/Roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [context.getHandler(), context.getClass()]);
        if (!requiredRoles) {
            return true;
        }

        const { user } = context.switchToHttp().getRequest();

        if (user.roles == null || user.roles.length == 0) {
            throw new UnauthorizedException();
        }else{
            user.roles.forEach((role) => {
                if (role.defination == null || role.defination.length == 0) {
                    throw new UnauthorizedException();
                }
            });
        }

        const roleCheck = user.roles.some((role) =>
            role.defination.some((definition) => requiredRoles.includes(definition))
        );
        return roleCheck;
    }
} 

