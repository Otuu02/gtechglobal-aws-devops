import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuditService } from '@modules/audit/audit.service';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  constructor(private readonly audit: AuditService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const req = context.switchToHttp().getRequest();
    const method = req.method as string;
    if (['GET', 'OPTIONS'].includes(method)) return next.handle();

    const actorId = req.user?.id;
    const entityType = context.getClass().name.replace('Controller', '');
    const entityId = req.params?.id;

    return next.handle().pipe(
      tap((after) => {
        void this.audit.record({
          actorId,
          action: method.toLowerCase(),
          entityType,
          entityId,
          after: after as Record<string, unknown>,
          ipAddress: req.ip,
          userAgent: req.headers['user-agent'],
        });
      }),
    );
  }
}
