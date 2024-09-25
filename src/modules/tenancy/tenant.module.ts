import { Module, DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantService } from './tenant.service';

@Module({
  providers: [TenantService],
  exports:[TenantService]
})
export class TenantModule {
  static forRoot(): DynamicModule {
    return {
      module: TenantModule,
      providers: [TenantService],
      exports: [TenantService],
    };
  }

  static forTenant(companyCode: string): DynamicModule {
    return {
      module: TenantModule,
      imports: [
        TypeOrmModule.forRootAsync({
          useFactory: async (tenantService: TenantService) => {
            const connection = await tenantService.getConnection(companyCode);
            return connection.options; 
          },
          inject: [TenantService],
        }),
      ],
    };
  }
}
