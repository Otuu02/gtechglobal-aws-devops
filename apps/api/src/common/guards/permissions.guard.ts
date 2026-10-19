import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from '@common/decorators/permissions.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const required = this.reflector.getAllAndOverride<string[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!required || required.length === 0) return true;

    const user = context.switchToHttp().getRequest().user;
    if (!user) throw new ForbiddenException('Authentication required');

    const granted: string[] =
      user.roles?.flatMap((r: any) => r.permissions?.map((p: any) => p.code)) ?? [];
    const allowed = required.every((p) => granted.includes(p));
    if (!allowed) throw new ForbiddenException('Insufficient permissions');
    return true;
  }
}
