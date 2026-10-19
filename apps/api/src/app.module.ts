import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

import { AuthModule } from '@modules/auth/auth.module';
import { UsersModule } from '@modules/users/users.module';
import { OrganizationsModule } from '@modules/organizations/organizations.module';
import { DepartmentsModule } from '@modules/departments/departments.module';
import { TeamsModule } from '@modules/teams/teams.module';
import { RolesModule } from '@modules/roles/roles.module';
import { PermissionsModule } from '@modules/permissions/permissions.module';
import { ProjectsModule } from '@modules/projects/projects.module';
import { TasksModule } from '@modules/tasks/tasks.module';
import { CommentsModule } from '@modules/comments/comments.module';
import { ApprovalsModule } from '@modules/approvals/approvals.module';
import { NotificationsModule } from '@modules/notifications/notifications.module';
import { DocumentsModule } from '@modules/documents/documents.module';
import { CrmModule } from '@modules/crm/crm.module';
import { FinanceModule } from '@modules/finance/finance.module';
import { ProductsModule } from '@modules/products/products.module';
import { GwashModule } from '@modules/gwash/gwash.module';
import { AuditModule } from '@modules/audit/audit.module';
import { DashboardModule } from '@modules/dashboard/dashboard.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local'],
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get<string>('DATABASE_URL'),
        autoLoadEntities: true,
        synchronize: false,
        logging: config.get('NODE_ENV') === 'development' ? ['error', 'warn'] : ['error'],
        ssl: config.get('NODE_ENV') === 'production' ? { rejectUnauthorized: false } : false,
      }),
    }),
    ThrottlerModule.forRoot([
      { name: 'short', ttl: 1_000, limit: 20 },
      { name: 'long', ttl: 60_000, limit: 300 },
    ]),

    // ─── Feature modules ───
    AuthModule,
    UsersModule,
    OrganizationsModule,
    DepartmentsModule,
    TeamsModule,
    RolesModule,
    PermissionsModule,
    ProjectsModule,
    TasksModule,
    CommentsModule,
    ApprovalsModule,
    NotificationsModule,
    DocumentsModule,
    CrmModule,
    FinanceModule,
    ProductsModule,
    GwashModule,
    AuditModule,
    DashboardModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
})
export class AppModule {}
