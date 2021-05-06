import { Injectable } from '@nestjs/common';
import { CreateBloqueModuleDto } from './dto/bloque-module.dto';

@Injectable()
export class BloqueModulesService {
  create(createBloqueModuleDto: CreateBloqueModuleDto) {
    return 'This action adds a new bloqueModule';
  }

  findAll() {
    return `This action returns all bloqueModules`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bloqueModule`;
  }

  update(id: number, updateBloqueModuleDto: CreateBloqueModuleDto) {
    return `This action updates a #${id} bloqueModule`;
  }

  remove(id: number) {
    return `This action removes a #${id} bloqueModule`;
  }
}
