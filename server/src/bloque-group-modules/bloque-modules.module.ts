import { Module } from '@nestjs/common';
import { BloqueModulesService } from './bloque-modules.service';
import { BloqueModulesController } from './bloque-modules.controller';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  controllers: [BloqueModulesController],
  providers: [BloqueModulesService, JwtStrategy]
})
export class BloqueModulesModule {}
