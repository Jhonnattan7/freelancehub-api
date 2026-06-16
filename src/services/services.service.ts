import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './service.entity';
import { CreateServiceDto } from './dto/create-service.dto';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) {}

  async create(dto: CreateServiceDto, userId: number) {
    const service = this.serviceRepository.create({
      ...dto,
      provider: { id: userId }, // TypeORM asignará esto como el Foreign Key 'providerId'
    });
    return this.serviceRepository.save(service);
  }
}
